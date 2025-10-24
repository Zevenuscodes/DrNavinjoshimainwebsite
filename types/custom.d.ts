// ambient module declarations for optional server SDKs
declare module "razorpay" {
  const Razorpay: any;
  export default Razorpay;
}

declare module "twilio" {
  const twilio: any;
  export default twilio;
}

// declare client components as modules to satisfy TypeScript in this workspace
declare module "@/components/Footer" {
  const Footer: any;
  export default Footer;
}

declare module "@/components/FloatingLeaves" {
  const FloatingLeaves: any;
  export default FloatingLeaves;
}

declare module "@/components/WhatsAppButton" {
  const WhatsAppButton: any;
  export default WhatsAppButton;
}
