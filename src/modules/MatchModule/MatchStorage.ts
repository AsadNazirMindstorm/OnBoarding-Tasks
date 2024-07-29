class MatchStorage
{
    public scoreCalculator(level:number, xp:number):number {
            
            // Calculate score using the weighted sum
            const score:number =  level * xp;
            return score;
        }
}