'use client';

interface LegalContentRendererProps {
    sections: any[]; // Using any because structures vary slightly between files, but follow a general pattern
    notice?: string;
    isTableOfContents?: boolean;
}

export const LegalContentRenderer = ({ sections, notice, isTableOfContents }: LegalContentRendererProps) => {
    return (
        <div className="text-left">
            {/* Table of Contents (for Privacy Policy) */}
            {isTableOfContents && (
                <div className="table-of-contents font-medium mb-8">
                    <p><strong>Table of Contents:</strong></p>
                    <ol>
                        {sections.map((section) => (
                            <li key={section.id}>
                                <a href={`#${section.id}`}>{section.title}</a>
                            </li>
                        ))}
                    </ol>
                </div>
            )}

            {/* Notice (if present) */}
            {notice && (
                <div className="my-4" dangerouslySetInnerHTML={{ __html: notice }}></div>
            )}

            {/* Sections */}
            {sections.map((section) => (
                <div key={section.id} id={section.id} className="policy-section my-4 mt-8">
                    <h2 className="py-1">{section.title}</h2>
                    {section.content.map((item: any, subIndex: number) => (
                        <div key={subIndex}>
                            {typeof item === 'string' ? (
                                <div className="mb-4" dangerouslySetInnerHTML={{ __html: item }}></div>
                            ) : item.type === 'list' ? (
                                <ul className="mx-8 my-4">
                                    {item.items.map((listItem: any, listIndex: number) => (
                                        <li key={listIndex}>
                                            {typeof listItem === 'string' ? (
                                                <span dangerouslySetInnerHTML={{ __html: listItem }}></span>
                                            ) : listItem.type === 'sub-list' ? (
                                                <ul className="mx-4 my-2">
                                                    {listItem.items.map((subItem: string, subListIndex: number) => (
                                                        <li key={subListIndex} dangerouslySetInnerHTML={{ __html: subItem }}></li>
                                                    ))}
                                                </ul>
                                            ) : null}
                                        </li>
                                    ))}
                                </ul>
                            ) : null}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};
