import { useNavigate, useRouterState } from '@tanstack/react-router';
import { Search } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { Input } from '~/components/ui/input';
import { cn } from '~/lib/utils';

export const SearchBar = ({ className }: { className?: string }) => {
  const [searchParam, setSearchParam] = useQueryState('search', {
    defaultValue: '',
    throttleMs: 500,
  });
  const router = useRouterState();
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const input = e.currentTarget.querySelector('input[type=search]') as HTMLInputElement;
    setSearchParam(input.value);

    if (router.resolvedLocation?.pathname !== '/products') {
      navigate({ to: '/products' });
    }
  };

  return (
    <div className={cn('mx-4 hidden max-w-md flex-1 items-center md:flex', className)}>
      <form className="w-full" onSubmit={onSubmit}>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search products..."
            className="w-full py-2 pl-8 pr-4"
            defaultValue={searchParam}
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
