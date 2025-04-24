import { useQueryState } from 'nuqs';
import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import { Button } from '~/components/ui/button';
import { Checkbox } from '~/components/ui/checkbox';
import { Slider } from '~/components/ui/slider';
import { useCategories } from '~/hooks/use-categories';
import usePriceRange from '~/hooks/use-price-range';
import { SearchBar } from '../Search';

export function ProductFilters() {
  const { data: categories = [] } = useCategories();
  const { data } = usePriceRange();
  const [priceRange, setPriceRange] = useState(() => {
    const searchParams = new URLSearchParams(window.location.search);

    const min = Number(searchParams.get('min_price') ?? 0);
    const max = Number(searchParams.get('max_price') ?? Number(data?.max_price) ?? 1000);

    const correctedMin = Number.isNaN(min) ? 0 : min;
    const correctedMax = Number.isNaN(max) ? 1000 : max;

    return [correctedMin, correctedMax];
  });

  const [localCategory, setLocalCategory] = useState<number[]>(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const category = searchParams.get('category') ?? '';
    return category
      .split(',')
      .map(Number)
      .filter((n) => !Number.isNaN(n) && n > 0);
  });
  const [, setMinPrice] = useQueryState('min_price', { defaultValue: '' });
  const [, setMaxPrice] = useQueryState('max_price', { defaultValue: '' });
  const [, setSelectedCategories] = useQueryState('category', { defaultValue: '' });

  const handleCheckboxChange = (category: number) => {
    setLocalCategory((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((item) => item !== category)
        : [...prevCategories, category],
    );
  };

  return (
    <div className="fixed bottom-0 left-0 top-20 w-72 overflow-y-auto bg-white p-4 sm:left-6 sm:w-80">
      <SearchBar className="mx-0 mb-10 flex w-full md:hidden" />
      <h2 className="mb-4 font-semibold">Filters</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="px-2">
              <Slider
                max={Number(data?.max_price ?? 1000)}
                step={1}
                value={priceRange}
                onValueChange={setPriceRange}
                className="my-4"
              />
              <div className="flex justify-between text-sm">
                <span>€{priceRange[0]}</span>
                <span>€{priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="categories">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={category.title}
                    checked={localCategory.includes(category.id)}
                    onCheckedChange={() => handleCheckboxChange(category.id)}
                  />
                  <label
                    htmlFor={category.title}
                    className="text-sm font-medium capitalize leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category.title}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Button
        className="mt-6 w-full"
        onClick={() => {
          setMinPrice(priceRange[0].toString());
          setMaxPrice(priceRange[1].toString());
          const categories = localCategory.join(',');
          setSelectedCategories(categories);
        }}
      >
        Apply Filters
      </Button>
      <Button
        className="mt-4 w-full"
        variant="outline"
        onClick={() => {
          setPriceRange([0, data?.max_price]);
          setMinPrice('');
          setMaxPrice('');
          setSelectedCategories('');
          setLocalCategory([]);
        }}
      >
        Reset Filters
      </Button>
    </div>
  );
}
