import Container from "@/components/Container";

export default function Success() {
  return (
    <section className="section">
      <Container>
        <div className="card p-8 text-center space-y-3">
          <h1 className="text-2xl font-semibold">Payment Confirmed 🎉</h1>
          <p>Your appointment is booked. Check your email/WhatsApp for confirmation.</p>
          <a className="btn-primary" href="/">Go to Home</a>
        </div>
      </Container>
    </section>
  );
}
