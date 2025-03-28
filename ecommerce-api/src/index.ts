import dotenv from "dotenv";
import express, { Request, Response } from "express";
import {connectDB, db} from "./config/db";
import cors from 'cors';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/create-checkout-session', async (req: Request, res: Response) => {
  const { lineItems, clientReferenceId } = req.body;
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    client_reference_id: clientReferenceId,
    mode: 'payment',
    success_url: `http://localhost:5173/order-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: 'http://localhost:5173/checkout',
  });

  res.json(session);
/*   res.redirect(303, session.url); */
});

app.post('/stripe/webhook', express.raw({type: "application/json"}), async (req: Request, res: Response) => {
  const event = req.body;
  switch (event.type) {
    case 'checkout.session.completed':
      const session = await event.data.object;
      const payment_status = "paid";
      const order_status = "received";

      try {
        const sql = `
        UPDATE orders
        SET payment_status = ?, order_status = ?
        WHERE payment_id = ?
        `
        const params = [payment_status, order_status, session.id];
        const [result] = await db.query<ResultSetHeader>(sql, params);

        result.affectedRows === 0
        ? res.status(400).json({message: "Order not found"})
        : res.json({message: "Order updated"});

        
        const updateStockSql = `
        UPDATE products
        JOIN order_items ON products.id = order_items.product_id
        JOIN orders ON order_items.order_id = orders.id
        SET products.stock = products.stock - order_items.quantity
        WHERE orders.id = ?
        `
        const updateStockParams = [session.client_reference_id];
        await db.query<ResultSetHeader>(updateStockSql, updateStockParams);

      } catch (error) {
        res.status(500).json({error: logError(error)});
        console.log(error);
      };
      break;
    default: break;
  }
})




// Routes
import productRouter from "./routes/products";
import customerRouter from "./routes/customers";
import orderRouter from "./routes/orders";
import orderItemRouter from "./routes/orderItems";
import { ResultSetHeader } from "mysql2";
import { logError } from "./utilities/logger";
app.use('/products', productRouter)
app.use('/customers', customerRouter)
app.use('/orders', orderRouter)
app.use('/order-items', orderItemRouter)


// Attempt to connect to the database
connectDB()
// Start Express server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`The server is running at http://localhost:${PORT}`);
})
