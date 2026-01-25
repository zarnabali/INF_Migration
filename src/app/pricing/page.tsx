'use client';

import { PublicLayout } from '@/components/layouts';
import { PricingTopBanner } from '@/components/pricing/PricingTopBanner';
import { PricingTabs } from '@/components/pricing/PricingTabs';
import { SecurePayment } from '@/components/pricing/SecurePayment';

export default function PricingPage() {
  return (
    <PublicLayout>
      <div className="pricing-container">
        <PricingTopBanner />
        <PricingTabs />
        <div className="sm:pb-14 pb-8">
          <SecurePayment />
        </div>
      </div>

      <style jsx>{`
                .pricing-container {
                    position: relative;
                    overflow: hidden;
                    background: linear-gradient(180deg, rgba(204, 232, 250, 0.3) 0%, rgba(255, 255, 255, 0) 100%);
                }
            `}</style>
    </PublicLayout>
  );
}
