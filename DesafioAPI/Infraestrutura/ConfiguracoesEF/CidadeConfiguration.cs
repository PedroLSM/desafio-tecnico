using DesafioAPI.Dominio.Entidades;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DesafioAPI.Infraestrutura.ConfiguracoesEF
{
    public class CidadeConfiguration : IEntityTypeConfiguration<Cidade>
    {
        public void Configure(EntityTypeBuilder<Cidade> builder)
        {
            builder.ToTable("Cidades");

            builder.Property(b => b.Nome)
                .IsRequired();

            builder.Property(b => b.Estado)
                .IsRequired();

            builder.HasKey(b => b.Id);
        }
    }
}
