import { Check, X } from 'lucide-react';
import { Button } from './ui/button';

export interface ComparisonColumn {
  name: string;
  icon?: React.ReactNode;
  isHighlighted?: boolean;
  price?: {
    currency: string;
    amount: number;
    period: string;
  };
  cta?: {
    text: string;
    onClick?: () => void;
  };
}

export interface ComparisonFeature {
  name: string;
  values: (boolean | string)[];
}

export interface ComparisonTableProps {
  title?: string;
  columns: ComparisonColumn[];
  features: ComparisonFeature[];
}

export function ComparisonTable({ title, columns, features }: ComparisonTableProps) {
  return (
    <div className="my-8">
      {title && (
        <h2 className="text-center mb-8">{title}</h2>
      )}
      
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="flex gap-4">
            {columns.map((column, columnIndex) => (
              <div
                key={columnIndex}
                className={`flex-1 min-w-[180px] rounded-lg ${
                  column.isHighlighted
                    ? 'bg-white shadow-lg border border-gray-200'
                    : ''
                }`}
              >
                {/* Header */}
                <div className={`p-6 ${column.isHighlighted ? 'border-b border-gray-100' : ''}`}>
                  <div className="flex items-center gap-3 mb-2">
                    {column.icon && (
                      <div className="flex items-center justify-center w-8 h-8 rounded bg-gray-100">
                        {column.icon}
                      </div>
                    )}
                    <span className={column.isHighlighted ? 'font-semibold' : 'text-gray-500'}>
                      {column.name}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="p-6 space-y-6">
                  {features.map((feature, featureIndex) => {
                    const value = feature.values[columnIndex];
                    return (
                      <div key={featureIndex} className="flex items-center min-h-[24px]">
                        {columnIndex === 0 ? (
                          // First column shows the feature name
                          <div className="flex items-center gap-2">
                            {typeof value === 'boolean' && value && (
                              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                            )}
                            <span className={column.isHighlighted ? 'font-medium' : ''}>
                              {feature.name}
                            </span>
                          </div>
                        ) : (
                          // Other columns show check/x marks
                          <div className="flex items-center justify-center w-full">
                            {typeof value === 'boolean' ? (
                              value ? (
                                <Check className="w-5 h-5 text-green-500" />
                              ) : (
                                <X className="w-5 h-5 text-red-400" />
                              )
                            ) : (
                              <span>{value}</span>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Pricing */}
                {column.price && (
                  <div className={`px-6 pb-6 ${column.isHighlighted ? 'pt-2' : 'pt-2'}`}>
                    <div className="flex items-baseline gap-1 justify-center">
                      <span className="text-sm text-gray-500 uppercase">{column.price.currency}</span>
                      <span className="text-3xl font-bold">{column.price.amount}</span>
                      <span className="text-gray-500">/{column.price.period}</span>
                    </div>
                  </div>
                )}

                {/* CTA Button */}
                {column.cta && (
                  <div className="px-6 pb-6">
                    <Button
                      onClick={column.cta.onClick}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {column.cta.text}
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
