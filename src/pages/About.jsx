
import {
    Sprout,
    Hammer,
    MapPinned,
    ShieldCheck,
} from "lucide-react";

import SectionHeading from "../components/SectionHeading";

export default function About({ t }) {
    return (
        <main>
            {/* About Section */}
            <section className="py-5">
                <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
                    {/* About Text */}
                    <div>
                        <p className="eyebrow">
                            {t.aboutEyebrow}
                        </p>

                        <h1 className="section-title">
                            {t.aboutTitle}
                        </h1>

                        <p className="mt-6 text-lg leading-8 text-stone-600 dark:text-stone-400">
                            {t.aboutP1}
                        </p>

                        <p className="mt-5 leading-7 text-stone-600 dark:text-stone-400">
                            {t.aboutP2}
                        </p>
                    </div>

                    {/* Brand Illustration */}
                    <div className="overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-yellow-200 via-orange-100 to-red-200 p-3 shadow-xl dark:from-yellow-900/30 dark:via-orange-950/40 dark:to-red-950/50">
                        <img
                            src="/images/shelar-masale-brand.png"
                            alt="Shelar Masalewale — traditional Maharashtrian spices, authentic taste, and natural goodness"
                            className="aspect-square w-full rounded-[2rem] object-contain"
                            loading="lazy"
                        />
                    </div>
                </div>
            </section>

            {/* Our Four Principles */}
            <section className="bg-white py-20 dark:bg-stone-950">
                <div className="container-page">
                    <SectionHeading
                        eyebrow={t.howWork}
                        title={t.fourDecisions}
                        center
                    />

                    <div className="mt-12 grid gap-5 md:grid-cols-2">
                        {[
                            [Sprout, "01", t.sourceWhole, t.sourceText],
                            [Hammer, "02", t.poundSlowly, t.poundText],
                            [MapPinned, "03", t.knowOrigin, t.originText],
                            [ShieldCheck, "04", t.packMatters, t.packText],
                        ].map(([Icon, number, title, text]) => (
                            <div
                                key={number}
                                className="rounded-3xl border border-stone-200 p-7 dark:border-stone-800"
                            >
                                <div className="flex items-center justify-between">
                                    <Icon
                                        className="text-maroon dark:text-orange-300"
                                        size={30}
                                    />

                                    <span className="font-display text-3xl font-bold text-stone-300 dark:text-stone-700">
                                        {number}
                                    </span>
                                </div>

                                <h3 className="mt-8 font-display text-2xl font-bold dark:text-white">
                                    {title}
                                </h3>

                                <p className="mt-3 leading-7 text-stone-500">
                                    {text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quality Commitments */}
            <section className="py-20">
                <div className="container-page rounded-[2.5rem] border border-stone-200 p-8 dark:border-stone-800 sm:p-12">
                    <div className="grid gap-10 md:grid-cols-3">
                        {/* Artificial Colours */}
                        <div>
                            <p className="font-display text-4xl font-bold text-maroon dark:text-orange-300">
                                0
                            </p>

                            <p className="mt-2 font-semibold">
                                {t.artificialColours}
                            </p>
                        </div>

                        {/* Unnecessary Fillers */}
                        <div>
                            <p className="font-display text-4xl font-bold text-maroon dark:text-orange-300">
                                0
                            </p>

                            <p className="mt-2 font-semibold">
                                {t.unnecessaryFillers}
                            </p>
                        </div>

                        {/* Whole Spice Focus */}
                        <div>
                            <p className="font-display text-4xl font-bold text-maroon dark:text-orange-300">
                                100%
                            </p>

                            <p className="mt-2 font-semibold">
                                {t.wholeFocus}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
