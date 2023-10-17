namespace Infrastructure.Entities
{
    public class SquareNet
    {
        public SquareNet()
        {
            Squares = new List<Square>();
        }
        public Guid Id { get; set; }
        public string Name { get; set; } = "Untitled";
        public List<Square> Squares { get; set; }
        public Guid? ApplicationUserId { get; set; }
    }
}
