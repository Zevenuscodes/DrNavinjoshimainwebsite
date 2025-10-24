"use client";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
      {subtitle && (
        <p className="text-gray-500 mt-2 max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}
