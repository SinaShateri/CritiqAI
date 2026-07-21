export type CategoryKey =
  | 'all'
  | 'performance'
  | 'seo'
  | 'accessibility'
  | 'ai';

export interface Category {
  key: CategoryKey;
  label: string;
}

const FeaturesCoreFeaturesCategoryTab = ({
  category,
  active,
  onSelect,
}: {
  category: Category;
  active: boolean;
  onSelect: (key: CategoryKey) => void;
}) => (
  <button
    onClick={() => onSelect(category.key)}
    className={
      active
        ? 'border-brand bg-brand rounded-xl border px-4 py-1.25 text-[12px] text-white transition-colors'
        : 'border-border text-foreground-muted hover:text-foreground rounded-xl border px-4 py-1.25 text-xs transition-colors'
    }
  >
    {category.label}
  </button>
);

export default FeaturesCoreFeaturesCategoryTab;
