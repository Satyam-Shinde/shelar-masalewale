
import { Link } from "react-router-dom";
import {
    ArrowRight,
    CheckCircle2,
    Sprout,
    Wheat,
    ShieldCheck,
    Clock3,
} from "lucide-react";

import ProductCard from "../components/ProductCard";
import SectionHeading from "../components/SectionHeading";
import products from "../data/products.json";

export default function Home({ t, lang }) {
    return (
        <main>
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="container-page grid min-h-[580px] items-center gap-12 py-8 lg:grid-cols-2">

                    {/* Hero Content */}
                    <div className="relative z-10">
                        <span className="eyebrow">
                            {t.kitchen}
                        </span>

                        <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-[1.02] text-stone-950 dark:text-white sm:text-7xl">
                            {t.heroTitle1}
                            <br />

                            <span className="text-maroon dark:text-orange-300">
                                {t.heroTitle2}
                            </span>

                            <br />
                            {t.heroTitle3}
                        </h1>

                        <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600 dark:text-stone-400">
                            {t.tagline} {t.heroText}
                        </p>

                        {/* Navigation Buttons */}
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link to="/products" className="btn-primary">
                                {t.shop}
                                <ArrowRight size={18} />
                            </Link>

                            <Link to="/about" className="btn-secondary">
                                {t.ourStory}
                            </Link>
                        </div>

                        {/* Product Benefits */}
                        <div className="mt-10 flex flex-wrap gap-6 text-sm font-semibold text-stone-600 dark:text-stone-300">
                            <span className="flex items-center gap-2">
                                <CheckCircle2 className="text-leaf" size={18} />
                                {t.noColours}
                            </span>

                            <span className="flex items-center gap-2">
                                <CheckCircle2 className="text-leaf" size={18} />
                                {t.noFillers}
                            </span>
                        </div>
                    </div>

                    {/* Hero Brand Illustration */}
                    <div className="relative mx-auto w-full max-w-lg">
                        {/* Decorative glow */}
                        <div className="absolute -inset-6 rounded-full bg-yellow-300/20 blur-3xl" />

                        {/* Brand Image */}
                        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                            <img
                                src="/images/shelar-masale-main.jpeg"
                                alt="Shelar Masalewale - Asal Chav, Shuddh Masale"
                                className="h-auto w-full object-contain"
                                fetchPriority="high"
                            />
                        </div>
                    </div>


                </div>
            </section>

            <section className="bg-white py-20 dark:bg-stone-950">
                <div className="container-page">
                    <SectionHeading
                        eyebrow={t.whyShelar}
                        title={t.oldMethod}
                        description={t.whyText}
                        center
                    />

                    <div className="mt-12 grid gap-5 md:grid-cols-4">
                        {[
                            [Sprout, t.handPicked, t.handPickedText],
                            [Wheat, t.kandap, t.kandapText],
                            [ShieldCheck, t.zero, t.zeroText],
                            [Clock3, t.micro, t.microText],
                        ].map(([Icon, title, text]) => (
                            <div
                                key={title}
                                className="rounded-3xl border border-stone-200 p-6 dark:border-stone-800"
                            >
                                <Icon
                                    className="text-maroon dark:text-orange-300"
                                    size={28}
                                />

                                <h3 className="mt-5 font-display text-xl font-bold dark:text-white">
                                    {title}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-stone-500">
                                    {text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bestselling Products */}
            <section className="py-20">
                <div className="container-page">
                    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                        <SectionHeading
                            eyebrow={t.fromKitchen}
                            title={t.bestsellers}
                            description={t.familyRecipes}
                        />

                        <Link
                            to="/products"
                            className="btn-secondary shrink-0"
                        >
                            {t.viewAll}
                            <ArrowRight size={17} />
                        </Link>
                    </div>

                    <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {products.slice(0, 3).map((p) => (
                            <ProductCard
                                key={p.id}
                                product={p}
                                t={t}
                                lang={lang}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Quality and Purity Banner */}
            <section className="container-page pb-20">
                <div className="overflow-hidden rounded-[2.5rem] bg-maroon p-8 text-white sm:p-12">
                    <div className="grid gap-10 lg:grid-cols-[1.3fr_.7fr] lg:items-center">

                        {/* Banner Content */}
                        <div>
                            <p className="eyebrow !text-yellow-300">
                                {t.standard}
                            </p>

                            <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold sm:text-5xl">
                                {t.authenticAroma}
                            </h2>

                            <p className="mt-5 max-w-2xl leading-7 text-red-100">
                                {t.standardText}
                            </p>
                        </div>

                        {/* Quality Statistics */}
                        <div className="rounded-3xl bg-white/10 p-6 backdrop-blur">
                            <p className="font-display text-3xl font-bold">
                                100%
                            </p>

                            <p className="mt-1 text-red-100">
                                {t.wholePurity}
                            </p>

                            <div className="my-5 h-px bg-white/20" />

                            <p className="font-display text-3xl font-bold">
                                {t.fresh}
                            </p>

                            <p className="mt-1 text-red-100">
                                {t.microProduction}
                            </p>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    );
}
