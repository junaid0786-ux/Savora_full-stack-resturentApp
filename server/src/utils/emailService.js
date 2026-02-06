import sendEmail from "../config/email.js";

export const sendOTPEmail = async (to, otp) => {
  const subject = "Your OTP to Reset Cravings Password";

  const message = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>OTP Verification</title>
</head>

<body style="margin:0; padding:0; background-color:#f3f4f6; font-family:'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding:24px 0;">
    <tr>
      <td align="center">

        <!-- Main Card -->
        <table width="600" cellpadding="0" cellspacing="0" style="
          background:#ffffff;
          border-radius:12px;
          box-shadow:0 10px 25px rgba(0,0,0,0.08);
          overflow:hidden;
        ">

          <!-- Header -->
          <tr>
            <td style="
              padding:28px;
              text-align:center;
              background:linear-linear(135deg, #0d6efd, #4f9cff);
            ">
              <h1 style="
                margin:0;
                font-size:22px;
                color:#ffffff;
                font-weight:600;
                letter-spacing:0.5px;
              ">
                Cravings Security Code
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px; color:#1f2937;">

              <p style="font-size:16px; margin:0 0 16px;">
                Hi 👋,
              </p>

              <p style="font-size:16px; margin:0 0 24px; line-height:1.6;">
                We received a request to reset your <strong>Cravings</strong> account password.
                Use the verification code below to continue.
              </p>

              <!-- OTP -->
              <div style="text-align:center; margin:32px 0;">
                <div style="
                  display:inline-block;
                  padding:18px 36px;
                  font-size:30px;
                  font-weight:700;
                  letter-spacing:8px;
                  color:#0d6efd;
                  background:#f1f5ff;
                  border-radius:10px;
                  border:1px solid #dbe4ff;
                ">
                  ${otp}
                </div>
              </div>

              <p style="font-size:14px; color:#6b7280; margin:0 0 12px;">
                ⏱ This code is valid for <strong>5 minutes</strong>.
              </p>

              <p style="font-size:14px; color:#6b7280; margin:0;">
                For your security, never share this OTP with anyone — even if they claim to be from Cravings.
              </p>

            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 32px;">
              <hr style="border:none; border-top:1px solid #e5e7eb;" />
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px; text-align:center; background:#fafafa;">
              <p style="font-size:12px; color:#9ca3af; margin:0;">
                If you didn’t request this password reset, you can safely ignore this email.
              </p>

              <p style="font-size:12px; color:#9ca3af; margin:8px 0 0;">
                © ${new Date().getFullYear()} Cravings India Pvt. Ltd. All rights reserved.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `;

  await sendEmail(to, subject, message);
};
