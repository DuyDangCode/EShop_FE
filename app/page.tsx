import ProductCard from '@/components/productCard';
import { pathHelper } from '@/helper/router';
import Link from 'next/link';

export default async function Home() {
  return (
    <div>
      <ProductCard></ProductCard>
      <Link href={pathHelper.signin()}>Sign in page</Link>
    </div>
  );
}
