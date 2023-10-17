using Infrastructure.Entities;
using Presentation.Requests;
using System.ComponentModel.DataAnnotations;

namespace Presentation.RequestModels
{
    public class SquareNetRequestModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<SquareRequestModel> Squares { get; set; } = new List<SquareRequestModel>();
        public Guid? ApplicationUserId { get; set; }
    }
}
