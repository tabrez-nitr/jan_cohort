import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Sparkles } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t bg-muted/30">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="bg-blue-600 p-1.5 rounded-lg">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold text-xl"><span className="text-blue-600">We</span>Volve</span>
                        </div>
                        <p className="text-muted-foreground mb-6 max-w-md">
                            Empowering careers with AI-driven insights. Build your resume, find your dream job, and evolve your professional journey with our intelligent platform.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <Input
                                placeholder="Enter your email"
                                className="max-w-xs"
                            />
                            <Button>Subscribe</Button>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-medium mb-4">Platform</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-foreground transition-colors">Resume Builder</a></li>
                            <li><a href="#" className="hover:text-foreground transition-colors">Job Search</a></li>
                            <li><a href="#" className="hover:text-foreground transition-colors">ATS Scanner</a></li>
                            <li><a href="#" className="hover:text-foreground transition-colors">Salary Insights</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-medium mb-4">Resources</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-foreground transition-colors">Career Blog</a></li>
                            <li><a href="#" className="hover:text-foreground transition-colors">Resume Templates</a></li>
                            <li><a href="#" className="hover:text-foreground transition-colors">Success Stories</a></li>
                            <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-medium mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-foreground transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
                            <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
                        </ul>
                    </div>
                </div>

                <Separator className="my-8" />

                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-muted-foreground mb-4 md:mb-0">
                        © 2024 WeVolve Inc. All rights reserved.
                    </p>
                    <div className="flex space-x-6 text-sm text-muted-foreground">
                        <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}