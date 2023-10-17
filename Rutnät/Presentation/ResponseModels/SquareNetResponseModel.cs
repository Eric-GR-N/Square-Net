using Infrastructure.Entities;

namespace Presentation.ResponseModels
{
    public class SquareNetResponseModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<SquareResponseModel> Squares { get; set; } = new List<SquareResponseModel>();
        public Guid? ApplicationUserId { get; set; }
    }
}
