import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import {
    FileText,
    Search,
    Briefcase,
    Zap,
    TrendingUp,
    Shield,
    Smartphone,
    BarChart3
} from "lucide-react";

const features = [
    {
        icon: FileText,
        title: "AI Resume Parsing",
        description: "Instantly extract and organize data from PDFs. Our AI understands complex resume layouts with 99% accuracy.",
        badge: "Core"
    },
    {
        icon: Search,
        title: "Smart Job Discovery",
        description: "Stop scrolling endlessly. Get job recommendations that match your extracted skills and experience level.",
        badge: "New"
    },
    {
        icon: Briefcase,
        title: "ATS Optimization",
        description: "See how well your resume scores against Applicant Tracking Systems and get actionable improvement tips.",
        badge: "Pro"
    },
    {
        icon: Zap,
        title: "Instant Tailoring",
        description: "Generate tailored versions of your resume for specific job descriptions in one click.",
        badge: "AI"
    },
    {
        icon: TrendingUp,
        title: "Salary Insights",
        description: "View estimated salary ranges for every job listing based on market data and your experience.",
        badge: "Pro"
    },
    {
        icon: Shield,
        title: "Data Privacy First",
        description: "Your personal data is encrypted and never shared with recruiters without your explicit permission.",
        badge: "Secure"
    },
    {
        icon: Smartphone,
        title: "Mobile Dashboard",
        description: "Manage your applications, track status, and reply to recruiters on the go with our responsive app.",
        badge: "Free"
    },
    {
        icon: BarChart3,
        title: "Career Analytics",
        description: "Track your application success rate, interview callbacks, and profile views over time.",
        badge: "Pro"
    }
];

export default function Features() {
    return (
        <section id="features" className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                        Everything you need to <span className="text-blue-600">land the job</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
                        From intelligent resume parsing to automated job matching, WeVolve provides the
                        comprehensive toolkit for your modern job search.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <Card key={index} className="relative group hover:shadow-lg transition-all duration-300 border-border/50">
                            <CardHeader>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="p-2 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                                        <feature.icon className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <Badge variant="secondary" className="text-xs bg-white shadow-sm border-gray-100">
                                        {feature.badge}
                                    </Badge>
                                </div>
                                <CardTitle className="text-xl">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">{feature.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}