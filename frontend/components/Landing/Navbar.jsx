
import Link from "next/link";
import { Sparkles, Github } from "lucide-react";
import { Button } from "./ui/button";

export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-background/80 backdrop-blur-md border-b">
            <div className="flex items-center gap-2">
                <div className="bg-blue-600 p-1.5 rounded-lg">
                    <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight">
                    <span className="text-blue-600">We</span>Volve
                </span>
            </div>

            <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
                <Link href="#features" className="hover:text-foreground transition-colors hidden sm:block">
                    Features
                </Link>
                <Link href="#pricing" className="hover:text-foreground transition-colors hidden sm:block">
                    Pricing
                </Link>
                <Link href="/dashboard" className="hover:text-foreground transition-colors">
                    Dashboard
                </Link>
                <Link href="https://github.com/samstabrez/wevolve" className="hover:text-foreground transition-colors">
                    <Github className="w-5 h-5" />
                </Link>
                <Link href="/dashboard">
                    <Button size="sm" className="hidden sm:inline-flex">Get Started</Button>
                </Link>
            </div>
        </nav>
    );
}
