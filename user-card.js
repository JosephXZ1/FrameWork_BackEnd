class UserCard extends HTMLElement
{
    constructor()
    {
        super(); 
        // Pilar 2: Encapsulación mediante Shadow DOM abierto 
        this.attachShadow({ mode: 'open' }); 
    }
    // Ciclo de vida: Atributos que monitorea el navegador 
    static get observedAttributes()
    {
        return ['name', 'role', 'status']; 
    } 

    // Ciclo de vida: Reacción a cambios de atributos 
    attributeChangedCallback(name, oldValue, newValue)
    { 
        if (oldValue !== newValue)
            { 
                this.render(); 
            }
    }

    // Ciclo de vida: Inserción del nodo en el DOM 
    connectedCallback()
    {
        this.render(); 
    }

    render()
    { 
        const name = this.getAttribute('name') || 'Usuario anónimo'; 
        const role = this.getAttribute('role') || 'Sin rol asignado'; 
        const status = this.getAttribute('status') || 'offline'; 
        const isOnline = status === 'online'; 

        this.shadowRoot.innerHTML = ` 
            <style> 
            /* :host aplica estilos a la raíz de la etiqueta personalizada */ 
            :host
            {
                display: inline-block; 
                font-family: system-ui, -apple-system, sans-serif; 
                margin: 10px; 
            } 
            .card
            {
                border: 1px solid #dcdcdc; 
                border-radius: 8px; 
                padding: 16px; 
                width: 220px; 
                background: #ffffff; 
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08); 
                color: #222; 
            } 
            h3
            {
                margin: 0 0 6px 0; 
                font-size: 1.1rem; 
                color: #1a1a1a; 
            } 
            p
            {
                margin: 0 0 10px 0; 
                font-size: 0.85rem; 
                color: #666; 
            } 
            .badge
            {
                display: inline-block; 
                padding: 2px 8px; 
                border-radius: 12px; 
                font-size: 0.75rem; 
                font-weight: bold; 
                color: #ffffff; 
                background-color: ${isOnline ? '#2ecc71' : '#e74c3c'}; 
                text-transform: uppercase; 
            } 
            .slot-container
            {
                margin-top: 12px; 
                padding-top: 8px; 
                border-top: 1px dashed #e0e0e0; 
                font-size: 0.8rem; 
                color: #555; 
            } 
            </style> 

            <div class="card"> 
            <h3>${name}</h3> 
            <p>${role}</p> 
            <span class="badge">${status}</span> 
                
            <!-- Pilar 3: Ranura para proyectar contenido externo --> 
            <div class="slot-container"> 
                <slot>Sin información extra</slot> 
            </div> 
            </div> 
        `; 
    } 
} 

// Pilar 1: Registro del Custom Element (nombre con guion obligatorio) 
if (!customElements.get('user-card'))
{
    customElements.define('user-card', UserCard); 
}