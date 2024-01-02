using DesafioAPI.Dominio.Interfaces;
using MediatR;
using System.ComponentModel.DataAnnotations;

namespace DesafioAPI.Aplicacao.Comandos.Clientes
{
    public class AlterarNomeClienteCommand : IRequest<GenericoResponse>, IValidatableObject
    {
        [Required(ErrorMessage = "Necessário informar o id.")]
        public int Id { get; set; }

        [Required(ErrorMessage = "Necessário informar o nome completo.")]
        public string Nome { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (Nome.Trim().Split(" ").Length < 2)
                yield return new ValidationResult("Necessário informar o nome completo.", new string[] { nameof(Nome) });
        }
    }

    public class AlterarNomeClienteCommandHandler : IRequestHandler<AlterarNomeClienteCommand, GenericoResponse>
    {
        private readonly IClienteRepository clienteRepository;

        public AlterarNomeClienteCommandHandler(IClienteRepository clienteRepository)
        {
            this.clienteRepository = clienteRepository;
        }

        public async Task<GenericoResponse> Handle(AlterarNomeClienteCommand request, CancellationToken cancellationToken)
        {
            var cliente = await clienteRepository.ConsultarPorId(request.Id);

            if (cliente is null)
                return GenericoResponse.FalhaResponse("Cliente não localizado.");

            cliente.AlterarNome(request.Nome);

            clienteRepository.Alterar(cliente);

            await clienteRepository.SaveChangesAsync();

            return GenericoResponse.SucessoResponse(new { cliente.Id, cliente.Nome }, "Nome alterado com sucesso.");
        }
    }
}
