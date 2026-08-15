import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductShelf } from '../../../src/components/Cards/ProductShelf';
import { makeProduct, makeCategory } from '../../fixtures';

describe('ProductShelf', () => {
  it('renders the category label and product count', () => {
    const category = makeCategory({ label: 'Blush', products: [makeProduct(), makeProduct()] });
    render(<ProductShelf category={category} skinColorHex="#D9B896" />);

    expect(screen.getByText('Blush')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('renders a card for every product up to the initial cap', () => {
    const products = Array.from({ length: 6 }, (_, i) => makeProduct({ id: `p${i}`, name: `Product ${i}` }));
    render(<ProductShelf category={makeCategory({ products })} skinColorHex="#D9B896" />);

    products.forEach((p) => {
      expect(screen.getByText(p.name)).toBeInTheDocument();
    });
  });

  it('caps rendered products at 10 and shows a "Load more" tile for the rest', () => {
    const products = Array.from({ length: 15 }, (_, i) => makeProduct({ id: `p${i}`, name: `Product ${i}` }));
    render(<ProductShelf category={makeCategory({ products })} skinColorHex="#D9B896" />);

    expect(screen.getByText('Product 9')).toBeInTheDocument();
    expect(screen.queryByText('Product 10')).not.toBeInTheDocument();
    expect(screen.getByText('Load more')).toBeInTheDocument();
    expect(screen.getByText('+5')).toBeInTheDocument();
  });

  it('reveals the remaining products when "Load more" is clicked', async () => {
    const user = userEvent.setup();
    const products = Array.from({ length: 15 }, (_, i) => makeProduct({ id: `p${i}`, name: `Product ${i}` }));
    render(<ProductShelf category={makeCategory({ products })} skinColorHex="#D9B896" />);

    await user.click(screen.getByText('Load more'));

    expect(screen.getByText('Product 14')).toBeInTheDocument();
    expect(screen.queryByText('Load more')).not.toBeInTheDocument();
  });

  it('does not render the "Load more" tile when there are 10 or fewer products', () => {
    const products = Array.from({ length: 10 }, (_, i) => makeProduct({ id: `p${i}` }));
    render(<ProductShelf category={makeCategory({ products })} skinColorHex="#D9B896" />);

    expect(screen.queryByText('Load more')).not.toBeInTheDocument();
  });

  it('toggles the saved/heart state when the heart button is clicked', async () => {
    const user = userEvent.setup();
    const product = makeProduct({ name: 'Heart Test' });
    render(<ProductShelf category={makeCategory({ products: [product] })} skinColorHex="#D9B896" />);

    const heartBtn = screen.getByRole('button', { name: `Save ${product.name}` });
    expect(heartBtn).toHaveAttribute('aria-pressed', 'false');

    await user.click(heartBtn);
    expect(screen.getByRole('button', { name: `Remove ${product.name} from saved` })).toHaveAttribute('aria-pressed', 'true');

    await user.click(screen.getByRole('button', { name: `Remove ${product.name} from saved` }));
    expect(screen.getByRole('button', { name: `Save ${product.name}` })).toHaveAttribute('aria-pressed', 'false');
  });

  it('shows scroll nav arrows by default, but hides them when unwrapScroll is set', () => {
    const category = makeCategory({ label: 'Lip' });
    const { rerender } = render(<ProductShelf category={category} skinColorHex="#D9B896" />);
    expect(screen.getByRole('button', { name: 'Scroll Lip left' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Scroll Lip right' })).toBeInTheDocument();

    rerender(<ProductShelf category={category} skinColorHex="#D9B896" unwrapScroll />);
    expect(screen.queryByRole('button', { name: 'Scroll Lip left' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Scroll Lip right' })).not.toBeInTheDocument();
  });

  it('scrolls the track when the nav arrows are clicked', async () => {
    const user = userEvent.setup();
    const scrollBySpy = vi.fn();
    Element.prototype.scrollBy = scrollBySpy;
    render(<ProductShelf category={makeCategory({ label: 'Lip' })} skinColorHex="#D9B896" />);

    await user.click(screen.getByRole('button', { name: 'Scroll Lip right' }));
    expect(scrollBySpy).toHaveBeenCalledWith({ left: 220, behavior: 'smooth' });

    await user.click(screen.getByRole('button', { name: 'Scroll Lip left' }));
    expect(scrollBySpy).toHaveBeenCalledWith({ left: -220, behavior: 'smooth' });
  });

  it('renders a real product image when the image URL is an absolute http(s) URL', () => {
    const product = makeProduct({ image: 'https://cdn.example.com/real.jpg', name: 'Real Image Product' });
    render(<ProductShelf category={makeCategory({ products: [product] })} skinColorHex="#D9B896" />);

    expect(screen.getByAltText('Real Image Product')).toBeInTheDocument();
  });

  it('falls back to a color swatch when the image path is not an absolute URL', () => {
    const product = makeProduct({ image: '/assets/products/missing.png', name: 'No Image Product' });
    const { container } = render(<ProductShelf category={makeCategory({ products: [product] })} skinColorHex="#D9B896" />);

    expect(screen.queryByAltText('No Image Product')).not.toBeInTheDocument();
    expect(container.querySelector('.product-media-swatch')).toBeInTheDocument();
  });

  it('falls back to a color swatch after the real image fails to load', () => {
    const product = makeProduct({ image: 'https://cdn.example.com/broken.jpg', name: 'Broken Image Product' });
    const { container } = render(<ProductShelf category={makeCategory({ products: [product] })} skinColorHex="#D9B896" />);

    const img = screen.getByAltText('Broken Image Product');
    fireEvent.error(img);

    expect(screen.queryByAltText('Broken Image Product')).not.toBeInTheDocument();
    expect(container.querySelector('.product-media-swatch')).toBeInTheDocument();
  });

  it('picks the shade closest to the given skin tone and shows its name', () => {
    const product = makeProduct({
      shades: [
        { name: 'Fair', hex: '#F5E1D3' },
        { name: 'Deep', hex: '#3B2417' },
      ],
    });
    render(<ProductShelf category={makeCategory({ products: [product] })} skinColorHex="#3B2417" />);

    expect(screen.getByText('Deep')).toBeInTheDocument();
    expect(screen.queryByText('Fair')).not.toBeInTheDocument();
  });

  it('hides the shade name label when the shade name is itself a hex code', () => {
    const product = makeProduct({ shades: [{ name: '#D9B896', hex: '#D9B896' }] });
    const { container } = render(<ProductShelf category={makeCategory({ products: [product] })} skinColorHex="#D9B896" />);

    expect(container.querySelector('.shade-swatch-name')).not.toBeInTheDocument();
  });

  it('shows the "Top pick" badge only for top-pick products', () => {
    const topPick = makeProduct({ id: 'a', isTopPick: true, name: 'Top Pick Product' });
    const regular = makeProduct({ id: 'b', isTopPick: false, name: 'Regular Product' });
    render(<ProductShelf category={makeCategory({ products: [topPick, regular] })} skinColorHex="#D9B896" />);

    expect(screen.getAllByText('Top pick')).toHaveLength(1);
  });

  it('renders the match percentage badge for each product', () => {
    const product = makeProduct({ matchPercent: 87 });
    render(<ProductShelf category={makeCategory({ products: [product] })} skinColorHex="#D9B896" />);

    expect(screen.getByText('87%')).toBeInTheDocument();
  });

  it('applies the shimmer swatch effect for the "highlight" category', () => {
    const product = makeProduct({ image: '/assets/products/none.png' });
    const { container } = render(
      <ProductShelf category={makeCategory({ key: 'highlight', products: [product] })} skinColorHex="#D9B896" />
    );

    expect(container.querySelector('.product-media-swatch.swatch-shimmer')).toBeInTheDocument();
  });

  it('applies the bloom swatch effect for the "blush" category', () => {
    const product = makeProduct({ image: '/assets/products/none.png' });
    const { container } = render(
      <ProductShelf category={makeCategory({ key: 'blush', products: [product] })} skinColorHex="#D9B896" />
    );

    expect(container.querySelector('.product-media-swatch.swatch-bloom')).toBeInTheDocument();
  });

  it('applies the gloss swatch effect for the "lip" category', () => {
    const product = makeProduct({ image: '/assets/products/none.png' });
    const { container } = render(
      <ProductShelf category={makeCategory({ key: 'lip', products: [product] })} skinColorHex="#D9B896" />
    );

    expect(container.querySelector('.product-media-swatch.swatch-gloss')).toBeInTheDocument();
  });
});
