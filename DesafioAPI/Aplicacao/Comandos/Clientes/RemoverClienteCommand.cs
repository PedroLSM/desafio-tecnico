using DesafioAPI.Dominio.Interfaces;
using MediatR;
using System.ComponentModel.DataAnnotations;

namespace DesafioAPI.Aplicacao.Comandos.Clientes
{
    public class RemoverClienteCommand : IRequest<GenericoResponse>
    {
        [Required(ErrorMessage = "Necessário informar o id.")]
        public int Id { get; set; }
    }
    public class RemoverClienteCommandHandler : IRequestHandler<RemoverClienteCommand, GenericoResponse>
    {
        private readonly IClienteRepository clienteRepository;

        public RemoverClienteCommandHandler(IClienteRepository clienteRepository)
        {
            this.clienteRepository = clienteRepository;
        }

        public async Task<GenericoResponse> Handle(RemoverClienteCommand request, CancellationToken cancellationToken)
        {
            var cliente = await clienteRepository.ConsultarPorId(request.Id);

            if (cliente is null)
                return GenericoResponse.FalhaResponse("Cliente não localizado.");

            clienteRepository.Remover(cliente);

            await clienteRepository.SaveChangesAsync();

            return GenericoResponse.SucessoResponse(null, "Cliente removido com sucesso.");
        }
    }
}
