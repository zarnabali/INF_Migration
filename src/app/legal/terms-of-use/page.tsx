'use client';

import { LegalPageLayout } from '@/components/legal/LegalPageLayout';
import { LegalContentRenderer } from '@/components/legal/LegalContentRenderer';
import { PolicyData, policyDetails } from '@/data/legal/termsOfService';

export default function TermsOfUsePage() {
  return (
    <LegalPageLayout
      title={policyDetails.name}
      lastUpdated={policyDetails.lastUpdateDate}
      tagline={policyDetails.tagline}
    >
      <LegalContentRenderer
        sections={PolicyData}
      />
    </LegalPageLayout>
  );
}
