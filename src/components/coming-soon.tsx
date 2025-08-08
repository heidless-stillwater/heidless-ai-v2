import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Construction } from 'lucide-react';

export function ComingSoon() {
    return (
        <Card className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <CardHeader>
                <div className="flex justify-center items-center mb-4">
                    <Construction className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="text-3xl font-headline">Coming Soon</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">This feature is currently under development. Please check back later!</p>
            </CardContent>
        </Card>
    );
}
