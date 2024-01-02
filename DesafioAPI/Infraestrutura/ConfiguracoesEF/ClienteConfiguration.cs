using DesafioAPI.Dominio.Entidades;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DesafioAPI.Infraestrutura.ConfiguracoesEF
{
    public class ClienteConfiguration : IEntityTypeConfiguration<Cliente>
    {
        public void Configure(EntityTypeBuilder<Cliente> builder)
        {
            builder.ToTable("Clientes");

            builder.Property(b => b.Nome)
                .IsRequired();

            builder.Property(b => b.Sexo)
                .IsRequired();

            builder.Property(b => b.DataNascimento)
                .IsRequired()
                .HasColumnType("date");

            builder.HasOne(b => b.Cidade)
                .WithMany()
                .HasForeignKey(b => b.CidadeId);

            builder.HasKey(b => b.Id);
        }
    }
}
