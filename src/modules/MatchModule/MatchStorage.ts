class MatchStorage
{
    public scoreCalculator(level:number, xp:number):number {
            // Define maximum values for normalization (adjust as needed)
            const maxLevel = 100;
            const maxXp = 10000;
        
            // Define weight for XP contribution (adjust as needed)
            const weight = 0.5;
            
            // Normalize level and XP
            const normalizedLevel = level/ maxLevel;
            const normalizedXp = xp / maxXp;
            
            // Calculate score using the weighted sum
            const score = normalizedLevel + weight * normalizedXp;
            
            return score;
        }
}