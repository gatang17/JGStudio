import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req) {
  try {
    const data = await req.json()
    const { name, email, message } = data

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "jgyourstudio@gmail.com", // tu correo
      subject: `Nuevo mensaje de ${name}`,
      html: `
        <h3>Nuevo mensaje desde tu web</h3>
        <p><b>Nombre:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Mensaje:</b> ${message}</p>
      `
    })

    return new Response(JSON.stringify({ success: true }), { status: 200 })

  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: "Email failed" }), { status: 500 })
  }
}
