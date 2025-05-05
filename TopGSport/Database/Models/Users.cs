namespace TopGSport.Database.Models
{
    public class Users
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public DateTime? BirthDate { get; set; }
        public string Password { get; set; }
        public int? MembershipId { get; set; }
        public DateTime? MembershipStartDate { get; set; }
        public string? Options { get; set; } // JSON jako string
        public DateTime? MembershipPurchaseDate { get; set; }
        public Membership? Membership { get; set; }
    }
}
