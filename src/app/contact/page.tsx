'use client';

import { PublicLayout } from '@/components/layouts';
import { TopBannerContact } from '@/components/contact/TopBannerContact';
import { ContactFormComponent } from '@/components/contact/ContactForm';

export default function ContactPage() {
  return (
    <PublicLayout>
      <div className="contact-container">
        <TopBannerContact
          title="Need To Get In Touch?"
          image="/images/contact/woman-on-beach.svg"
        />
        <ContactFormComponent />
      </div>

      <style jsx>{`
                .contact-container {
                    position: relative;
                    overflow: hidden;
                    background: linear-gradient(180deg, rgba(204, 232, 250, 0.3) 0%, rgba(255, 255, 255, 0) 100%);
                }
            `}</style>
    </PublicLayout>
  );
}
