import * as React from 'react';
import { Html, Head, Preview, Body, Container, Section, Heading, Text, Link, Button } from '@react-email/components';

export const EmailTemplate = ({ name, url }) => (
  <Html>
    <Head />
    <Preview>Your Website May Be Down - Immediate Action Required</Preview>
    <Body style={{ backgroundColor: '#f4f4f4', fontFamily: 'Arial, sans-serif', margin: '0', padding: '20px' }}>
      <Container style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <Section>
          <Heading style={{ color: '#333333', fontSize: '24px', marginBottom: '20px' }}>⚠️ Action Required: Website Downtime Detected</Heading>
          <Text style={{ color: '#555555', fontSize: '16px', lineHeight: '1.5' }}>
            Dear {name},
          </Text>
          <Text style={{ color: '#555555', fontSize: '16px', lineHeight: '1.5', marginTop: '10px' }}>
            We wanted to inform you that our monitoring service, <strong>Ping Pilot</strong>, has detected a potential downtime on your website <strong>{url}</strong>. This issue may affect your website&apos;s availability to visitors.
          </Text>
          <Text style={{ color: '#555555', fontSize: '16px', lineHeight: '1.5', marginTop: '10px' }}>
            Please check your website immediately to ensure everything is functioning properly. You can use the link below to view more details and take necessary actions:
          </Text>
          <Button
            href="https://pingpilot.vercel.app"
            style={{
              display: 'block',
              width: '100%',
              padding: '12px 0',
              textAlign: 'center',
              backgroundColor: '#007bff',
              color: '#ffffff',
              borderRadius: '5px',
              textDecoration: 'none',
              fontSize: '16px',
              marginTop: '20px'
            }}
          >
            View Dashboard
          </Button>
          <Text style={{ color: '#555555', fontSize: '16px', lineHeight: '1.5', marginTop: '20px' }}>
            If you need any assistance or have any questions, please feel free to reach out to our support team at <Link href="mailto:support@pingpilot.com" style={{ color: '#007bff' }}>support@pingpilot.com</Link>.
          </Text>
          <Text style={{ color: '#555555', fontSize: '16px', lineHeight: '1.5', marginTop: '20px' }}>
            Thank you for using Ping Pilot to monitor your website&apos;s performance.
          </Text>
          <Text style={{ color: '#555555', fontSize: '16px', lineHeight: '1.5', marginTop: '10px' }}>
            Best regards,
            <br />
            The Ping Pilot Team
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);
