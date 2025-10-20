import postgres from "postgres";
import dotenv from "dotenv"
dotenv.config();

export const sql = postgres(process.env.DATABASE_URL, {
    ssl: 'require'
});


//DATABASE_URL='postgresql://neondb_owner:npg_kxH4zfWyTB9O@ep-gentle-field-acqaqmwv-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'JWT_SECRET=suaChaveUltraSecreta