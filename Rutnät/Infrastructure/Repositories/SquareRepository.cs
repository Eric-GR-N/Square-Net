using Infrastructure.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public interface ISquareRepository
    {
        Task<Square?> GetSquareByIdAsync(Guid id);
        Task UpdateSquareAsync(Square updatedSquare);

    }
    public class SquareRepository : RepositoryBase<Square>, ISquareRepository
    {
        public SquareRepository(ApplicationDbContext dbContext) : base(dbContext) { }

        public async Task<Square?> GetSquareByIdAsync(Guid id)
        {
            return await GetByIdAsync(id);
        }

        public async Task UpdateSquareAsync(Square updatedSquare)
        {
            await UpdateAsync(updatedSquare);
        }
    }
}
