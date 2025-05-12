import {
	type Component,
	batch,
	component,
	on,
	toggleClass,
} from "@zeix/ui-element";

export type ScrollAreaProps = {
	overflowStart: boolean;
	overflowEnd: boolean;
};

const connectIntersectionObserver = (el: Component<ScrollAreaProps>) => {
	const child = el.firstElementChild;
	if (!child) return;
	const observer = new IntersectionObserver(([entry]) => {
		if (
			entry.intersectionRatio > 0 &&
			entry.intersectionRatio < 0.999 // ignore rounding errors of fraction pixels
		) {
			el.overflowEnd = true;
		} else {
			batch(() => {
				el.overflowStart = false;
				el.overflowEnd = false;
			});
		}
	});
	observer.observe(child);
	return () => observer.disconnect();
};

export default component(
	"scroll-area",
	{
		overflowStart: false,
		overflowEnd: false,
	},
	(el) => {
		const isHorizontal = el.getAttribute("orientation") === "horizontal";
		const hasOverflow = () => el.overflowStart || el.overflowEnd;
		let scrolling: number | null = null;

		return [
			connectIntersectionObserver,
			toggleClass("overflow", hasOverflow),
			toggleClass("overflow-start", "overflowStart"),
			toggleClass("overflow-end", "overflowEnd"),
			on("scroll", () => {
				if (!hasOverflow()) return;
				if (scrolling) cancelAnimationFrame(scrolling);
				scrolling = requestAnimationFrame(() => {
					scrolling = null;
					el.overflowStart = isHorizontal
						? el.scrollLeft > 0
						: el.scrollTop > 0;
					el.overflowEnd = isHorizontal
						? el.scrollLeft < el.scrollWidth - el.offsetWidth
						: el.scrollTop < el.scrollHeight - el.offsetHeight;
				});
			}),
		];
	},
);

declare global {
	interface HTMLElementTagNameMap {
		"scroll-area": Component<ScrollAreaProps>;
	}
}
