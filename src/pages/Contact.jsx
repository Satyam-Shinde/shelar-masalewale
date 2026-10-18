
import { useState } from "react";
import {
    Mail,
    Phone,
    MapPin,
    Send,
    MessageCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import SectionHeading from "../components/SectionHeading";

export default function Contact({ t }) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = async (e) => {
        e.preventDefault();

        const formElement = e.currentTarget;
        const formData = new FormData(formElement);

        const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

        if (!accessKey) {
            toast.error("Web3Forms access key is missing.");
            return;
        }

        formData.append("access_key", accessKey);
        formData.append("subject", "New Contact Message - Shelar Masalewale");

        setIsSubmitting(true);

        try {
            const response = await fetch(
                "https://api.web3forms.com/submit",
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await response.json();

            if (response.ok && data.success) {
                toast.success(t.messageReceived || "Message sent successfully!");
                formElement.reset();
            } else {
                toast.error(data.message || "Failed to send your message.");
            }
        } catch (error) {
            console.error("Web3Forms submission error:", error);
            toast.error("Network error. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main>
            <section className="py-20">
                <div className="container-page">
                    <SectionHeading
                        eyebrow={t.contactEyebrow}
                        title={t.contactTitle}
                        description={t.contactText}
                        center
                    />

                    <div className="mt-12 grid gap-8 lg:grid-cols-[.75fr_1.25fr]">

                        {/* Contact Information */}
                        <div className="rounded-3xl bg-maroon p-8 text-white">
                            <h2 className="font-display text-3xl font-bold">
                                Shelar Masalewale
                            </h2>

                            <p className="mt-3 leading-7 text-red-100">
                                {t.basedPune}
                            </p>

                            <div className="mt-10 space-y-5 text-sm">
                                <p className="flex gap-3">
                                    <MapPin
                                        size={20}
                                        className="shrink-0 text-yellow-300"
                                    />
                                    पुणे, महाराष्ट्र, भारत
                                </p>

                                <p className="flex gap-3">
                                    <Phone
                                        size={20}
                                        className="shrink-0 text-yellow-300"
                                    />
                                    +91 99708 79244
                                </p>

                                <p className="flex gap-3">
                                    <Mail
                                        size={20}
                                        className="shrink-0 text-yellow-300"
                                    />
                                    shelar.masale07@gmail.com
                                </p>
                            </div>

                            <a
                                href="https://wa.me/9970879244"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-10 inline-flex items-center gap-2 rounded-full bg-yellow-300 px-5 py-3 font-bold text-red-950"
                            >
                                <MessageCircle size={18} />
                                {t.whatsapp}
                            </a>
                        </div>

                        {/* Contact Form */}
                        <form
                            onSubmit={submit}
                            className="rounded-3xl border border-stone-200 bg-white p-8 shadow-soft dark:border-stone-800 dark:bg-stone-900"
                        >
                            <div className="grid gap-5 sm:grid-cols-2">

                                {/* Name */}
                                <label className="text-sm font-semibold">
                                    {t.name}

                                    <input
                                        type="text"
                                        name="name"
                                        className="mt-2 w-full rounded-2xl border border-stone-300 bg-[#fffaf2] px-4 py-3 outline-none focus:border-maroon dark:border-stone-700 dark:bg-stone-950 dark:text-white"
                                        placeholder={t.namePlaceholder}
                                        required
                                    />
                                </label>

                                {/* Email */}
                                <label className="text-sm font-semibold">
                                    {t.email}

                                    <input
                                        type="email"
                                        name="email"
                                        className="mt-2 w-full rounded-2xl border border-stone-300 bg-[#fffaf2] px-4 py-3 outline-none focus:border-maroon dark:border-stone-700 dark:bg-stone-950 dark:text-white"
                                        placeholder={t.emailPlaceholder}
                                        required
                                    />
                                </label>
                            </div>

                            {/* Message */}
                            <label className="mt-5 block text-sm font-semibold">
                                {t.message}

                                <textarea
                                    rows="7"
                                    name="message"
                                    className="mt-2 w-full resize-none rounded-2xl border border-stone-300 bg-[#fffaf2] px-4 py-3 outline-none focus:border-maroon dark:border-stone-700 dark:bg-stone-950 dark:text-white"
                                    placeholder={t.messagePlaceholder}
                                    required
                                />
                            </label>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn-primary mt-5 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <Send size={17} />
                                {isSubmitting ? "Sending..." : t.send}
                            </button>
                        </form>

                    </div>
                </div>
            </section>
        </main>
    );
}
