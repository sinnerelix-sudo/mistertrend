import { z } from "zod";

export const env = z
  .object({
    DATABASE_URL: z.string(),
    DB_PROVIDER: z.enum(["postgresql", "sqlite"]).default("postgresql"),
    SESSION_SECRET: z.string().min(16),
    OTP_PROVIDER: z.enum(["console", "sms_stub"]).default("console"),
    EPOINT_API_BASE: z.string().default("https://api.epoint.az"),
    COLUMBA_API_BASE: z.string().default("https://api.columba.az")
  })
  .parse(process.env);
