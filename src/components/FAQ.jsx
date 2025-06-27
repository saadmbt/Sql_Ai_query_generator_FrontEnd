import GoogleAd from "./GoogleAd";

export default function FAQ() {
    return (
        <section className="mt-16 bg-gradient-to-br from-indigo-50 to-white rounded-2xl shadow-lg p-10 max-w-3xl w-full text-gray-800 mx-auto">
            <h2 className="text-3xl font-extrabold mb-8 text-indigo-700 text-center tracking-tight">
                Frequently Asked Questions
            </h2>
            <dl className="space-y-6">
                <FAQItem
                    question="What is an AI SQL Query Generator?"
                    answer="An AI SQL Query Generator is a tool that uses artificial intelligence to convert plain English or natural language into SQL queries. It helps users generate SQL online without needing to know SQL syntax."
                />
                <FAQItem
                    question="Can I use this tool to generate SQL for MySQL, PostgreSQL, or SQL Server?"
                    answer="Yes! This SQL query generator supports all major SQL dialects including MySQL, PostgreSQL, and SQL Server. Just describe your query and get the code instantly."
                />
                <GoogleAd slot={import.meta.env.VITE_ADSENSE_AdsOverlay} style={{ display: "block" }}/>
                <FAQItem
                    question="Is this AI SQL tool free to use?"
                    answer="Yes, our AI SQL tool is free. You only need to watch a short ad to support the service before generating each query."
                />
                <FAQItem
                    question="How do I convert text to SQL?"
                    answer='Simply enter your request in plain English (e.g., "Get all users who signed up last month") and our tool will convert text to SQL automatically.'
                />
                <FAQItem
                    question="Is my data secure?"
                    answer="Your queries are never stored or shared. We respect your privacy and ensure a secure experience for all users."
                />
                <GoogleAd slot={import.meta.env.VITE_ADSENSE_AdsOverlay} style={{ display: "block" }}/>
                <FAQItem
                    question="What are the benefits of using an online SQL generator?"
                    answer="An online SQL generator saves time, reduces errors, and helps both beginners and experts quickly create SQL queries from natural language."
                />
            </dl>
            <GoogleAd slot={import.meta.env.VITE_ADSENSE_AdsOverlay} style={{ display: "block" }}/>
        </section>
    );
}

function FAQItem({ question, answer }) {
    return (
        <div className="bg-white bg-opacity-80 rounded-lg shadow-sm p-5 hover:shadow-md transition-shadow">
            <dt className="font-semibold text-indigo-600 text-lg flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0-4h.01" />
                </svg>
                {question}
            </dt>
            <dd className="ml-7 mt-2 text-gray-700">{answer}</dd>
        </div>
    );
}