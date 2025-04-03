import { Preview, Heading, Row, Section, Text } from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
  return (
    <>
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Preview>Here&apos;s your verification code: {otp}</Preview>
        <Section>
          <Heading as="h2">Hello {username},</Heading>

          <Text>
            Thank you for registering. Please use the following verification
            code to complete your registration:
          </Text>

          <Text>{otp}</Text>

          <Text>
            If you did not request this code, please ignore this email.
          </Text>

          {/* <Row>
            <Button
              href={`http://localhost:3000/verify/${username}`}
              style={{ color: '#61dafb' }}
            >
              Verify here
            </Button>
          </Row> */}
        </Section>
      </main>
    </>
  );
}
