namespace TopGSport.Database.Models
{
    public class Membership
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Price { get; set; }
        public string? Description { get; set; }
        public string? Bonus { get; set; }
        public string? Hours { get; set; }
        public string? Features { get; set; } // JSON jako string
    }
}
