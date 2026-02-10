export interface OtpProvider { send(phone: string, code: string): Promise<void>; }

export class ConsoleOtpProvider implements OtpProvider {
  async send(phone: string, code: string) { console.log(`[OTP] ${phone}: ${code}`); }
}

export class SmsStubProvider implements OtpProvider {
  async send(phone: string, code: string) {
    console.log(`TODO SMS gateway integration for ${phone}. Code: ${code}`);
  }
}

export function getOtpProvider() {
  return process.env.OTP_PROVIDER === "sms_stub" ? new SmsStubProvider() : new ConsoleOtpProvider();
}
