
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { 
  Home, 
  ShoppingBag, 
  User, 
  LayoutDashboard, 
  Plus, 
  UtensilsCrossed, 
  Coffee, 
  IceCream, 
  Flame,
  Search as SearchIcon,
  MapPin,
  ChevronUp,
  X,
  CheckCircle,
  Minus,
  ArrowRight,
  ShoppingCart,
  Drumstick,
  LogOut,
  ChefHat,
  Bike,
  Lock,
  Phone,
  QrCode,
  Banknote,
  CreditCard,
  Package,
  LayoutList,
  History,
  HelpCircle,
  Ticket,
  Settings,
  Trash2,
  Zap,
  Leaf,
  Crown,
  Star,
  Clock,
  Pizza,
  Fish,
  Sandwich,
  Salad,
  Wheat,
  Soup,
  Wine,
  Cookie,
  Croissant,
  Timer,
  Award,
  Edit,
  TrendingUp,
  DollarSign,
  PauseCircle,
  PlayCircle,
  AlertCircle,
  MessageCircle,
  Loader2,
  LogIn,
  ChevronRight,
  Clipboard,
  Copy,
  ChevronDown,
  Users,
  Eye,
  ToggleLeft,
  ToggleRight,
  Tag,
  Monitor,
  List,
  Grid,
  Wand2,
  Printer,
  Percent,
  Menu,
  PanelRightClose,
  PanelRightOpen,
  RefreshCw,
  Bell,
  Image as ImageIcon,
  Sparkles as SparklesIcon,
  Briefcase
} from 'lucide-react';
import { Product, ScreenName, Order, CartItem, OrderStatus, User as UserType, Coupon } from './types';

// --- MOCK DATA & ICONS ---

const Sparkles = ({size, className}: any) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L12 3Z"/></svg>;

const CATEGORIES = [
  { id: 'all', name: 'Tudo', icon: UtensilsCrossed },
  { id: 'burgers', name: 'Burgers', icon: Flame },
  { id: 'pizza', name: 'Pizzas', icon: Pizza },
  { id: 'sushi', name: 'Japonesa', icon: Fish },
  { id: 'snacks', name: 'Lanches', icon: Sandwich },
  { id: 'healthy', name: 'Saudável', icon: Salad },
  { id: 'sides', name: 'Porções', icon: Drumstick },
  { id: 'pasta', name: 'Massas', icon: Wheat },
  { id: 'combos', name: 'Combos', icon: ShoppingBag },
  { id: 'drinks', name: 'Bebidas', icon: Coffee },
  { id: 'desserts', name: 'Doces', icon: IceCream },
  { id: 'bakery', name: 'Padaria', icon: Croissant },
  { id: 'soup', name: 'Sopas', icon: Soup },
  { id: 'wine', name: 'Adega', icon: Wine },
  { id: 'cookies', name: 'Biscoitos', icon: Cookie },
  { id: 'vegan', name: 'Vegano', icon: Leaf },
];

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'X-Bacon Premium',
    price: 32.90,
    costPrice: 12.50,
    stock: 45,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600',
    description: 'Blend 180g, muito bacon crocante, cheddar inglês e maionese da casa.',
    category: 'burgers',
    rating: 4.8,
    isPopular: true
  },
  {
    id: '101',
    name: 'Double Smash',
    price: 28.90,
    costPrice: 9.00,
    stock: 30,
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600',
    description: 'Dois smashes de 80g prensados na chapa com crosta, dobro de cheddar.',
    category: 'burgers',
    rating: 4.7
  },
  {
    id: '3',
    name: 'Batata Suprema',
    price: 22.90,
    costPrice: 6.00,
    stock: 100,
    image: 'https://images.unsplash.com/photo-1573080496987-fad71880e457?w=600',
    description: 'Batata crinkle coberta com fondue de queijo e farofa de bacon.',
    category: 'sides',
    rating: 4.9,
    isPopular: true
  },
  {
    id: '2',
    name: 'Coca-Cola 350ml',
    price: 6.00,
    costPrice: 2.50,
    stock: 150,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600',
    description: 'Gelada no ponto certo.',
    category: 'drinks',
    rating: 5.0
  },
  {
    id: '4',
    name: 'Milkshake Morango',
    price: 18.90,
    costPrice: 5.00,
    stock: 20,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600',
    description: 'Feito com sorvete artesanal e pedaços de fruta.',
    category: 'desserts',
    rating: 4.6
  },
    {
    id: '5',
    name: 'Combo Casal',
    price: 89.90,
    costPrice: 35.00,
    stock: 10,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600',
    description: '2 Burgers Premium + 2 Batatas Médias + 2 Refri.',
    category: 'combos',
    rating: 5.0
  }
];

const PROMO_BANNERS = [
    { id: 1, title: "Week Burger", subtitle: "30% OFF", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800", icon: Flame },
    { id: 2, title: "Entrega Grátis", subtitle: "Acima de R$50", image: "https://images.unsplash.com/photo-1555529669-26f2d10bf180?w=800", icon: Bike },
    { id: 3, title: "Sobremesa", subtitle: "Grátis no Combo", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800", icon: IceCream },
    { id: 4, title: "Veggie", subtitle: "Novas Opções", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800", icon: Leaf },
    { id: 5, title: "Happy Hour", subtitle: "Bebidas 2x1", image: "https://images.unsplash.com/photo-1514362545857-3bc16549766b?w=800", icon: Clock },
    { id: 6, title: "Clube VIP", subtitle: "Descontos", image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800", icon: Crown },
    { id: 7, title: "Novidades", subtitle: "Confira", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800", icon: Star },
    { id: 8, title: "Oferta Relâmpago", subtitle: "Só hoje", image: "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=800", icon: Zap },
    { id: 9, title: "Combos", subtitle: "Para Família", image: "https://images.unsplash.com/photo-1544025162-d76690b67f11?w=800", icon: ShoppingBag },
    { id: 10, title: "Sucos Naturais", subtitle: "Refrescante", image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=800", icon: Coffee },
];

const INITIAL_COUPONS: Coupon[] = [
    { id: '1', code: 'VMSHOP10', discountPercent: 10, description: '10% de desconto', isActive: true },
    { id: '2', code: 'FRETEGRATIS', discountValue: 5, description: 'Frete Grátis', isActive: true },
    { id: '3', code: 'BURGERLOVER', discountValue: 15, description: 'R$ 15 OFF em Burgers', isActive: true }
];

const INITIAL_USERS: UserType[] = [
    { 
        id: 'user_1', 
        name: 'Vinny Cliente', 
        phone: '11999999999', 
        role: 'CLIENT', 
        password: '123456',
        addresses: [{ id: '1', label: 'Casa', street: 'Rua das Flores', number: '450', dist: 'Jardim Paulista', zip: '01423-001' }], 
        usedCoupons: [],
        ordersCount: 2
    },
    { 
        id: 'user_2', 
        name: 'Maria Silva', 
        phone: '11988888888', 
        role: 'CLIENT', 
        password: '123456',
        addresses: [], 
        usedCoupons: ['VMSHOP10'],
        ordersCount: 5
    },
    // STAFF USERS
    { id: 'admin', name: 'Administrador', phone: '12982704573', password: '123456', role: 'ADMIN', addresses: [], usedCoupons: [], ordersCount: 0 },
    { id: 'kitchen', name: 'Chef Cozinha', phone: '12777777777', password: '123456', role: 'KITCHEN', addresses: [], usedCoupons: [], ordersCount: 0 },
    { id: 'pdv', name: 'Operador Caixa', phone: '12888888888', password: '123456', role: 'PDV', addresses: [], usedCoupons: [], ordersCount: 0 },
    { id: 'delivery', name: 'Entregador', phone: '12999999999', password: '123456', role: 'DELIVERY', addresses: [], usedCoupons: [], ordersCount: 0 },
];

// --- HELPER COMPONENTS ---

async function urlToBase64(url: string): Promise<string | null> {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64data = reader.result as string;
                const base64String = base64data.split(',')[1];
                resolve(base64String);
            };
            reader.onerror = () => resolve(null); 
            reader.readAsDataURL(blob);
        });
    } catch (e) {
        console.warn("CORS/Fetch error converting image. Use local image or Data URL for AI editing.", e);
        return null; 
    }
}

const Toast = ({ message, visible, onHide }: { message: string, visible: boolean, onHide: () => void }) => {
    useEffect(() => {
        if (visible) {
            const timer = setTimeout(onHide, 3000);
            return () => clearTimeout(timer);
        }
    }, [visible, onHide]);
    if (!visible) return null;
    return (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-[100] animate-slideUp w-full max-w-xs px-4 pointer-events-none">
            <div className="bg-[#0f0f11]/95 backdrop-blur-md text-white px-6 py-4 rounded-2xl shadow-2xl border border-vm-purple/30 flex items-center gap-3 pointer-events-auto">
                <div className="bg-green-500/20 p-1 rounded-full">
                    <CheckCircle size={20} className="text-green-500" />
                </div>
                <span className="text-sm font-medium">{message}</span>
            </div>
        </div>
    );
};

const NavIcon = ({ icon: Icon, label, isActive, onClick, badge }: { icon: any, label: string, isActive: boolean, onClick: () => void, badge?: number }) => (
    <button 
        onClick={onClick} 
        className={`flex flex-col items-center justify-center w-full gap-1 group py-2 relative transition-colors ${isActive ? 'text-vm-purple' : 'text-gray-500 hover:text-white'}`}
    >
        <div className={`relative p-1.5 rounded-xl transition-all duration-300 ${isActive ? 'bg-white/10 -translate-y-1' : ''}`}>
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} className={`transition-all duration-300 ${isActive ? 'scale-110 drop-shadow-[0_0_10px_rgba(122,0,255,0.4)]' : ''}`} />
            {badge ? (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-[#0f0f11]">
                    {badge}
                </span>
            ) : null}
        </div>
        <span className="text-[10px] font-bold transition-all duration-300 opacity-80">{label}</span>
    </button>
);

const ReceiptPrint = ({ cart, total, discount, finalTotal, paymentMethod, orderId, user, cashReceived, change, sentToKitchen }: any) => {
    if (!cart) return null;

    return (
        <div id="print-area" className="hidden print:block p-4 font-mono text-black bg-white w-[80mm] mx-auto leading-tight">
            <div className="text-center border-b-2 border-dashed border-black pb-2 mb-2">
                <h1 className="text-xl font-black uppercase">VM SHOP</h1>
                <p className="text-[10px]">Rua Principal, 1000 - Centro</p>
                <p className="text-[10px]">CNPJ: 00.000.000/0001-00</p>
                <p className="text-[10px] mt-1">{new Date().toLocaleString()}</p>
                <p className="text-xs font-bold mt-1">PEDIDO #{orderId ? orderId.slice(-4) : '0000'}</p>
                 {sentToKitchen ? (
                     <p className="text-xs font-bold border border-black inline-block px-1 mt-1">ENVIADO PARA COZINHA</p>
                 ) : (
                    <p className="text-xs font-bold border border-black inline-block px-1 mt-1">BALCÃO (SEM COZINHA)</p>
                 )}
            </div>

            <div className="text-xs uppercase mb-2">
                 <div className="flex justify-between font-bold border-b border-black pb-1 mb-1">
                     <span>Item</span>
                     <span>Total</span>
                 </div>
                 {cart.map((item: CartItem) => (
                     <div key={item.id} className="flex justify-between mb-1">
                         <div className="flex-1">
                             <div>{item.quantity}x {item.name}</div>
                             <div className="text-[10px] pl-4">UN: R$ {item.price.toFixed(2)}</div>
                         </div>
                         <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                     </div>
                 ))}
            </div>

            <div className="border-t-2 border-dashed border-black pt-2 mb-2 text-sm">
                <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>R$ {total.toFixed(2)}</span>
                </div>
                 {discount > 0 && (
                    <div className="flex justify-between">
                        <span>Desconto:</span>
                        <span>- R$ {discount.toFixed(2)}</span>
                    </div>
                )}
                <div className="flex justify-between font-bold text-lg mt-1">
                    <span>TOTAL:</span>
                    <span>R$ {finalTotal.toFixed(2)}</span>
                </div>
            </div>

             <div className="text-xs border-b-2 border-dashed border-black pb-2 mb-2">
                <p>Forma de Pagamento: <span className="font-bold">
                    {paymentMethod === 'CASH' ? 'DINHEIRO' : paymentMethod === 'PIX' ? 'PIX' : paymentMethod === 'DEBIT' ? 'DÉBITO' : 'CRÉDITO'}
                </span></p>
                
                {paymentMethod === 'CASH' && (
                    <>
                        <p>Recebido: R$ {cashReceived?.toFixed(2)}</p>
                        <p>Troco: R$ {change?.toFixed(2)}</p>
                    </>
                )}

                {user && <p>Atendente: {user.name}</p>}
            </div>

            <div className="text-center text-[10px]">
                <p>*** NÃO É DOCUMENTO FISCAL ***</p>
                <p className="mt-1">Obrigado pela preferência!</p>
                <p>www.vmshop.com.br</p>
            </div>
        </div>
    );
};

// --- NEW SCREENS FOR NAVIGATION (PROFILE, PRODUCTS, COUPONS) ---

const ProfileScreen = ({ user, onLogout, onLoginNavigation }: any) => {
    // GUEST VIEW
    if (!user) {
        return (
            <div className="pb-32 animate-fadeIn bg-white min-h-screen flex flex-col items-center justify-center p-6 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-400">
                    <User size={40} />
                </div>
                <h2 className="text-2xl font-black text-gray-900 mb-2">Perfil do Usuário</h2>
                <p className="text-gray-500 mb-8 max-w-xs mx-auto">
                    Faça login para ver seus pedidos, salvar endereços e acessar área administrativa.
                </p>
                <button 
                    onClick={onLoginNavigation}
                    className="w-full max-w-sm bg-vm-purple hover:bg-purple-700 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-purple-500/20 flex items-center justify-center gap-2"
                >
                    <LogIn size={20} /> Entrar ou Cadastrar
                </button>
                <div className="mt-8 pt-8 border-t border-gray-100 w-full max-w-sm">
                    <p className="text-xs text-gray-400">
                        Área restrita para funcionários e administradores também é acessada pelo botão acima.
                    </p>
                </div>
            </div>
        );
    }

    // LOGGED IN VIEW
    return (
        <div className="pb-32 animate-fadeIn bg-white min-h-screen">
            <div className="bg-vm-purple p-6 pb-12 rounded-b-[2.5rem] text-white shadow-xl shadow-purple-500/20">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-white text-vm-purple rounded-full flex items-center justify-center text-2xl font-black border-4 border-white/20">
                        {user?.name?.charAt(0) || <User/>}
                    </div>
                    <div>
                        <h2 className="text-2xl font-black">{user?.name || 'Visitante'}</h2>
                        <p className="text-white/80 text-sm">{user?.phone || 'Sem telefone'}</p>
                    </div>
                </div>
                <div className="flex gap-2 mt-4">
                    <div className="bg-white/10 px-4 py-2 rounded-xl flex-1 text-center">
                        <div className="text-xl font-black">{user?.ordersCount || 0}</div>
                        <div className="text-[10px] uppercase font-bold text-white/70">Pedidos</div>
                    </div>
                     <div className="bg-white/10 px-4 py-2 rounded-xl flex-1 text-center">
                        <div className="text-xl font-black">0</div>
                        <div className="text-[10px] uppercase font-bold text-white/70">Pontos</div>
                    </div>
                </div>
            </div>

            <div className="p-6 -mt-6 space-y-4">
                <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 flex flex-col gap-2">
                    <button className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors text-left text-gray-700">
                        <MapPin size={20} className="text-vm-purple"/>
                        <span className="font-bold flex-1">Meus Endereços</span>
                        <ChevronRight size={16} className="text-gray-400"/>
                    </button>
                     <button className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors text-left text-gray-700">
                        <ShoppingBag size={20} className="text-vm-purple"/>
                        <span className="font-bold flex-1">Meus Pedidos</span>
                        <ChevronRight size={16} className="text-gray-400"/>
                    </button>
                    <button className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors text-left text-gray-700">
                        <HelpCircle size={20} className="text-vm-purple"/>
                        <span className="font-bold flex-1">Ajuda e Suporte</span>
                        <ChevronRight size={16} className="text-gray-400"/>
                    </button>
                </div>

                <button onClick={onLogout} className="w-full p-4 bg-red-50 text-red-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors">
                    <LogOut size={20}/> Sair da Conta
                </button>

                <p className="text-center text-xs text-gray-400 mt-8">Versão 1.0.0 • VM Shop Premium</p>
            </div>
        </div>
    );
};

const CouponsScreen = ({ coupons }: any) => {
    return (
        <div className="pb-32 animate-fadeIn min-h-screen bg-[#F3F0FF]">
            <div className="p-6 bg-white shadow-sm mb-4">
                <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                    <Ticket className="text-vm-purple"/> Cupons
                </h1>
                <p className="text-gray-500 text-sm">Aproveite descontos exclusivos</p>
            </div>
            
            <div className="px-6 space-y-4">
                {coupons.map((c: Coupon) => (
                    <div key={c.id} className="bg-white p-0 rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex relative group">
                        <div className="bg-vm-purple w-3 border-r-2 border-dashed border-white"></div>
                        <div className="p-5 flex-1">
                            <h3 className="font-black text-gray-900 text-lg">{c.code}</h3>
                            <p className="text-sm text-gray-500 mb-3">{c.description}</p>
                            <div className="inline-block bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">
                                {c.discountPercent ? `${c.discountPercent}% OFF` : `R$ ${c.discountValue} OFF`}
                            </div>
                        </div>
                        <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-vm-purple transition-colors" onClick={() => navigator.clipboard.writeText(c.code)}>
                            <Copy size={20}/>
                        </button>
                        {/* Circle cutouts */}
                        <div className="absolute -top-3 left-[9px] w-6 h-6 bg-[#F3F0FF] rounded-full"></div>
                        <div className="absolute -bottom-3 left-[9px] w-6 h-6 bg-[#F3F0FF] rounded-full"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ProductsScreen = ({ products, onAddToCart, onProductClick }: any) => {
    const [search, setSearch] = useState('');
    const filtered = products.filter((p: Product) => p.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="pb-32 animate-fadeIn min-h-screen bg-[#F3F0FF]">
            <div className="bg-white p-4 sticky top-0 z-10 shadow-sm">
                <div className="relative">
                    <SearchIcon className="absolute left-4 top-3.5 text-gray-400" size={20}/>
                    <input 
                        autoFocus
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="O que você procura hoje?"
                        className="w-full bg-gray-100 border-none rounded-2xl py-3 pl-12 pr-4 text-gray-900 font-medium outline-none focus:ring-2 focus:ring-vm-purple/20 transition-all"
                    />
                </div>
            </div>

            <div className="p-4 grid grid-cols-2 gap-3">
                {filtered.map((p: Product) => (
                    <div key={p.id} onClick={() => onProductClick(p)} className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3 group active:scale-95 transition-all">
                        <div className="aspect-square rounded-xl overflow-hidden relative bg-gray-100">
                            <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={p.name}/>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-sm leading-tight line-clamp-2 mb-1">{p.name}</h3>
                            <div className="flex justify-between items-center mt-2">
                                <span className="font-black text-lg text-vm-purple">R$ {p.price.toFixed(0)}</span>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); onAddToCart(p); }}
                                    className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-vm-purple transition-colors shadow-lg"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- ADMIN SCREEN (REBUILT & ROBUST) ---

function AdminScreen({ orders, products, users, onUpdateProduct, onAddProduct, onDeleteProduct, onAddUser, onBack }: any) {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'clients' | 'employees'>('dashboard');
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    // AI State
    const [aiPrompt, setAiPrompt] = useState("coloque este produto em evidencia qualidade food porn premium substituindo o fundo por um fundo de loja de conveniencia da marca vm pode imaginar o fundo");
    const [isGenerating, setIsGenerating] = useState(false);

    // Mock Form State
    const [formData, setFormData] = useState<Partial<Product>>({
        name: '', price: 0, costPrice: 0, stock: 0, category: 'burgers', description: '', image: ''
    });
    
    const [userFormData, setUserFormData] = useState({
        name: '', phone: '', role: 'KITCHEN'
    });

    const totalSales = orders.reduce((acc: number, o: Order) => acc + o.total, 0);
    const totalProfit = orders.reduce((acc: number, o: Order) => {
        // Simple profit calc based on items in order
        const cost = o.items.reduce((c, i) => c + (i.costPrice || 0) * i.quantity, 0);
        return acc + (o.total - cost);
    }, 0);

    const handleEditClick = (p: Product) => {
        setEditingProduct(p);
        setFormData(p);
        setIsProductModalOpen(true);
    };

    const handleAddNewClick = () => {
        setEditingProduct(null);
        setFormData({ name: '', price: 0, costPrice: 0, stock: 10, category: 'burgers', description: '', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600' });
        setIsProductModalOpen(true);
    };

    const handleSave = () => {
        if (editingProduct) {
            onUpdateProduct({ ...editingProduct, ...formData });
        } else {
            onAddProduct({ ...formData, id: Date.now().toString(), rating: 5 });
        }
        setIsProductModalOpen(false);
    };

    const handleSaveUser = () => {
        onAddUser({ 
            id: `user_${Date.now()}`,
            name: userFormData.name,
            phone: userFormData.phone,
            role: userFormData.role,
            password: '123456', // Default password for staff created by admin
            addresses: [],
            usedCoupons: [],
            ordersCount: 0
        });
        setIsUserModalOpen(false);
        setUserFormData({ name: '', phone: '', role: 'KITCHEN' });
    };

    const handleGenerateImage = async () => {
        if (!formData.image) return alert("Insira uma URL de imagem base primeiro.");
        if (!process.env.API_KEY) return alert("Chave de API não configurada.");
        
        setIsGenerating(true);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            let imagePart = null;
            if (formData.image.startsWith('data:')) {
                const mimeType = formData.image.substring(5, formData.image.indexOf(';'));
                const data = formData.image.split(',')[1];
                imagePart = { inlineData: { mimeType, data } };
            } else {
                 const base64 = await urlToBase64(formData.image);
                 if (base64) {
                    imagePart = { inlineData: { mimeType: 'image/png', data: base64 } };
                 }
            }

            if (!imagePart) {
                alert("Não foi possível acessar a imagem devido a restrições de segurança (CORS) ou URL inválida. Por favor, tente usar uma imagem local (Data URL) ou uma URL pública permitida.");
                setIsGenerating(false);
                return;
            }

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: {
                    parts: [
                        imagePart,
                        { text: aiPrompt }
                    ]
                }
            });
            
            const parts = response.candidates?.[0]?.content?.parts;
            if (parts) {
                for (const part of parts) {
                    if (part.inlineData) {
                        const newImageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
                        setFormData({ ...formData, image: newImageUrl });
                        break;
                    }
                }
            }
        } catch (e) {
            console.error(e);
            alert("Erro ao gerar imagem. Tente novamente ou verifique se a imagem é acessível.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#111113] text-white font-sans">
             {/* Admin Header */}
             <div className="bg-[#1a1a1d] border-b border-white/5 p-4 flex justify-between items-center sticky top-0 z-20">
                 <h1 className="text-xl font-bold flex items-center gap-2">
                     <LayoutDashboard className="text-vm-purple"/> VM<span className="text-white/50">Admin</span>
                 </h1>
                 <button onClick={onBack} className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-colors text-xs font-bold">Voltar ao App</button>
             </div>

             {/* Admin Tabs */}
             <div className="flex gap-1 p-4 border-b border-white/5 bg-[#111113] overflow-x-auto">
                 <button onClick={() => setActiveTab('dashboard')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'dashboard' ? 'bg-vm-purple text-white' : 'text-gray-500 hover:text-white'}`}>Visão Geral</button>
                 <button onClick={() => setActiveTab('products')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'products' ? 'bg-vm-purple text-white' : 'text-gray-500 hover:text-white'}`}>Produtos</button>
                 <button onClick={() => setActiveTab('clients')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'clients' ? 'bg-vm-purple text-white' : 'text-gray-500 hover:text-white'}`}>Clientes</button>
                 <button onClick={() => setActiveTab('employees')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'employees' ? 'bg-vm-purple text-white' : 'text-gray-500 hover:text-white'}`}>Equipe</button>
             </div>

             <div className="p-6">
                 {activeTab === 'dashboard' && (
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeIn">
                         <div className="bg-[#1a1a1d] p-6 rounded-2xl border border-white/5">
                             <div className="text-gray-500 text-xs font-bold uppercase mb-2">Vendas Totais</div>
                             <div className="text-3xl font-black text-white">R$ {totalSales.toFixed(2)}</div>
                         </div>
                         <div className="bg-[#1a1a1d] p-6 rounded-2xl border border-white/5">
                             <div className="text-gray-500 text-xs font-bold uppercase mb-2">Lucro Estimado</div>
                             <div className="text-3xl font-black text-green-500">R$ {totalProfit.toFixed(2)}</div>
                         </div>
                         <div className="bg-[#1a1a1d] p-6 rounded-2xl border border-white/5">
                             <div className="text-gray-500 text-xs font-bold uppercase mb-2">Pedidos Realizados</div>
                             <div className="text-3xl font-black text-blue-500">{orders.length}</div>
                         </div>
                     </div>
                 )}

                 {activeTab === 'products' && (
                     <div className="animate-fadeIn">
                         <div className="flex justify-between items-center mb-6">
                             <h2 className="text-lg font-bold">Catálogo de Produtos</h2>
                             <button onClick={handleAddNewClick} className="bg-vm-purple hover:bg-purple-600 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 text-sm transition-colors">
                                 <Plus size={16}/> Novo Produto
                             </button>
                         </div>
                         
                         <div className="grid grid-cols-1 gap-3">
                             {products.map((p: Product) => (
                                 <div key={p.id} className="bg-[#1a1a1d] p-4 rounded-xl border border-white/5 flex items-center gap-4 hover:border-white/10 transition-colors group">
                                     <img src={p.image} className="w-16 h-16 rounded-lg object-cover bg-gray-800" alt={p.name}/>
                                     <div className="flex-1">
                                         <h3 className="font-bold text-white">{p.name}</h3>
                                         <div className="flex items-center gap-4 mt-1 text-sm">
                                             <span className="text-gray-400">Custo: <span className="text-white">R$ {p.costPrice?.toFixed(2)}</span></span>
                                             <span className="text-gray-400">Venda: <span className="text-green-400">R$ {p.price.toFixed(2)}</span></span>
                                             <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-gray-300">Est: {p.stock}</span>
                                         </div>
                                     </div>
                                     <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                         <button onClick={() => handleEditClick(p)} className="p-2 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"><Edit size={16}/></button>
                                         <button onClick={() => onDeleteProduct(p.id)} className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"><Trash2 size={16}/></button>
                                     </div>
                                 </div>
                             ))}
                         </div>
                     </div>
                 )}
                 
                 {activeTab === 'clients' && (
                     <div className="text-center text-gray-500 py-10">
                         <Users size={48} className="mx-auto mb-4 opacity-50"/>
                         <p>Gestão de Clientes em breve...</p>
                     </div>
                 )}

                {activeTab === 'employees' && (
                     <div className="animate-fadeIn">
                         <div className="flex justify-between items-center mb-6">
                             <h2 className="text-lg font-bold">Quadro de Funcionários</h2>
                             <button onClick={() => setIsUserModalOpen(true)} className="bg-vm-purple hover:bg-purple-600 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 text-sm transition-colors">
                                 <Plus size={16}/> Novo Funcionário
                             </button>
                         </div>
                         
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                             {users.filter((u: UserType) => u.role !== 'CLIENT').map((u: UserType) => (
                                 <div key={u.id} className="bg-[#1a1a1d] p-4 rounded-xl border border-white/5 flex items-center gap-4">
                                     <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center font-bold text-lg text-vm-purple border border-white/10">
                                         {u.name.charAt(0)}
                                     </div>
                                     <div className="flex-1">
                                         <h3 className="font-bold text-white">{u.name}</h3>
                                         <p className="text-xs text-gray-500">{u.phone}</p>
                                     </div>
                                     <div className="bg-white/10 px-3 py-1 rounded text-xs font-bold text-gray-300 uppercase">
                                         {u.role}
                                     </div>
                                 </div>
                             ))}
                         </div>
                     </div>
                 )}
             </div>

             {/* PRODUCT EDIT MODAL */}
             {isProductModalOpen && (
                 <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                     <div className="bg-[#1a1a1d] w-full max-w-2xl rounded-2xl border border-white/10 shadow-2xl flex flex-col max-h-[90vh]">
                         <div className="p-6 border-b border-white/10 flex justify-between items-center">
                             <h2 className="text-xl font-bold text-white">{editingProduct ? 'Editar Produto' : 'Novo Produto'}</h2>
                             <button onClick={() => setIsProductModalOpen(false)} className="text-gray-500 hover:text-white"><X size={24}/></button>
                         </div>
                         
                         <div className="flex-1 overflow-y-auto p-6 space-y-6">
                             {/* Image Section with AI */}
                             <div className="flex flex-col gap-4">
                                 <label className="text-xs font-bold text-gray-400 uppercase">Imagem do Produto</label>
                                 <div className="flex gap-4 items-start">
                                     <div className="w-32 h-32 bg-black rounded-xl overflow-hidden shrink-0 border border-white/10 relative group">
                                         {formData.image ? <img src={formData.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-600"><ImageIcon/></div>}
                                         {isGenerating && <div className="absolute inset-0 bg-black/50 flex items-center justify-center"><Loader2 className="animate-spin text-vm-purple"/></div>}
                                     </div>
                                     <div className="flex-1 space-y-3">
                                         <input 
                                            type="text" 
                                            value={formData.image} 
                                            onChange={e => setFormData({...formData, image: e.target.value})}
                                            placeholder="URL da imagem..."
                                            className="w-full bg-[#111113] border border-white/10 rounded-lg p-3 text-sm text-white outline-none focus:border-vm-purple"
                                         />
                                         
                                         {/* AI Generator Controls */}
                                         <div className="bg-vm-purple/10 border border-vm-purple/30 p-3 rounded-xl space-y-2">
                                             <div className="flex items-center gap-2 text-vm-purple font-bold text-xs uppercase">
                                                 <SparklesIcon size={14}/> Estúdio IA (Gemini 2.5)
                                             </div>
                                             <textarea 
                                                value={aiPrompt}
                                                onChange={e => setAiPrompt(e.target.value)}
                                                className="w-full bg-[#111113] border border-white/10 rounded-lg p-2 text-xs text-gray-300 min-h-[60px] outline-none focus:border-vm-purple"
                                             />
                                             <button 
                                                onClick={handleGenerateImage}
                                                disabled={isGenerating}
                                                className="w-full bg-vm-purple hover:bg-purple-600 disabled:opacity-50 text-white py-2 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2"
                                             >
                                                 {isGenerating ? 'Gerando...' : 'Melhorar com IA'}
                                             </button>
                                         </div>
                                     </div>
                                 </div>
                             </div>

                             <div className="grid grid-cols-2 gap-4">
                                 <div>
                                     <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Nome</label>
                                     <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#111113] border border-white/10 rounded-lg p-3 text-sm text-white outline-none focus:border-vm-purple"/>
                                 </div>
                                 <div>
                                     <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Categoria</label>
                                     <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-[#111113] border border-white/10 rounded-lg p-3 text-sm text-white outline-none focus:border-vm-purple appearance-none">
                                         {CATEGORIES.filter(c => c.id !== 'all').map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                     </select>
                                 </div>
                             </div>

                             <div className="grid grid-cols-3 gap-4">
                                 <div>
                                     <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Preço Venda</label>
                                     <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="w-full bg-[#111113] border border-white/10 rounded-lg p-3 text-sm text-white outline-none focus:border-vm-purple"/>
                                 </div>
                                 <div>
                                     <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Custo</label>
                                     <input type="number" value={formData.costPrice} onChange={e => setFormData({...formData, costPrice: Number(e.target.value)})} className="w-full bg-[#111113] border border-white/10 rounded-lg p-3 text-sm text-white outline-none focus:border-vm-purple"/>
                                 </div>
                                 <div>
                                     <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Estoque</label>
                                     <input type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: Number(e.target.value)})} className="w-full bg-[#111113] border border-white/10 rounded-lg p-3 text-sm text-white outline-none focus:border-vm-purple"/>
                                 </div>
                             </div>

                             <div>
                                 <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Descrição</label>
                                 <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-[#111113] border border-white/10 rounded-lg p-3 text-sm text-white outline-none focus:border-vm-purple"/>
                             </div>
                         </div>

                         <div className="p-6 border-t border-white/10 flex justify-end gap-3">
                             <button onClick={() => setIsProductModalOpen(false)} className="px-6 py-3 rounded-xl font-bold text-gray-400 hover:text-white transition-colors">Cancelar</button>
                             <button onClick={handleSave} className="px-6 py-3 rounded-xl font-bold bg-white text-black hover:bg-gray-200 transition-colors">Salvar Produto</button>
                         </div>
                     </div>
                 </div>
             )}

             {/* USER ADD MODAL */}
             {isUserModalOpen && (
                 <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                     <div className="bg-[#1a1a1d] w-full max-w-md rounded-2xl border border-white/10 shadow-2xl p-6">
                         <div className="flex justify-between items-center mb-6">
                             <h2 className="text-xl font-bold text-white">Novo Funcionário</h2>
                             <button onClick={() => setIsUserModalOpen(false)}><X className="text-gray-500 hover:text-white"/></button>
                         </div>
                         <div className="space-y-4">
                             <div>
                                 <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Nome Completo</label>
                                 <input type="text" value={userFormData.name} onChange={e => setUserFormData({...userFormData, name: e.target.value})} className="w-full bg-[#111113] border border-white/10 rounded-lg p-3 text-white outline-none focus:border-vm-purple"/>
                             </div>
                             <div>
                                 <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">WhatsApp (Login)</label>
                                 <input type="text" value={userFormData.phone} onChange={e => setUserFormData({...userFormData, phone: e.target.value})} className="w-full bg-[#111113] border border-white/10 rounded-lg p-3 text-white outline-none focus:border-vm-purple"/>
                             </div>
                             <div>
                                 <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Cargo / Permissão</label>
                                 <select value={userFormData.role} onChange={e => setUserFormData({...userFormData, role: e.target.value})} className="w-full bg-[#111113] border border-white/10 rounded-lg p-3 text-white outline-none focus:border-vm-purple">
                                     <option value="ADMIN">Administrador</option>
                                     <option value="KITCHEN">Cozinha</option>
                                     <option value="PDV">Operador de Caixa</option>
                                     <option value="DELIVERY">Entregador</option>
                                 </select>
                             </div>
                             <button onClick={handleSaveUser} className="w-full bg-vm-purple hover:bg-purple-600 text-white font-bold py-3 rounded-xl mt-4">Cadastrar</button>
                         </div>
                     </div>
                 </div>
             )}
        </div>
    )
}

const PDVScreen = ({ products, cart, onAddToCart, onRemoveFromCart, onUpdateCartQty, onCheckout, onLogout, lastOrder, onClearCart }: any) => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [isCartOpen, setIsCartOpen] = useState(false);
    
    // Checkout State
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'CASH'|'CREDIT'|'DEBIT'|'PIX'|null>(null);
    const [cashValue, setCashValue] = useState('');
    const [discountValue, setDiscountValue] = useState('');
    const [sendToKitchen, setSendToKitchen] = useState(true);

    const filteredProducts = products.filter((p: Product) => 
        (selectedCategory === 'all' || p.category === selectedCategory) &&
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const cartSubtotal = cart.reduce((acc: number, item: CartItem) => acc + (item.price * item.quantity), 0);
    const discount = parseFloat(discountValue) || 0;
    const cartTotal = Math.max(0, cartSubtotal - discount);

    const handleInitialPaymentClick = (method: 'CASH'|'CREDIT'|'DEBIT'|'PIX') => {
        setSelectedPaymentMethod(method);
        setCashValue(''); // Reset cash input
        setPaymentModalOpen(true);
    };

    const confirmPayment = () => {
        let extraData: any = { sentToKitchen: sendToKitchen };
        
        if (selectedPaymentMethod === 'CASH') {
            const received = parseFloat(cashValue);
            if (isNaN(received) || received < cartTotal) {
                alert('Valor recebido inválido ou insuficiente.');
                return;
            }
            extraData.cashReceived = received;
            extraData.change = received - cartTotal;
        }

        onCheckout(selectedPaymentMethod, cartTotal, discount, extraData);
        setPaymentModalOpen(false);
        setIsCartOpen(false);
        setTimeout(() => window.print(), 500);
    };

    return (
        <div className="flex h-screen bg-[#111113] text-white overflow-hidden relative">
            {/* Main Content: Product Grid */}
            <div className="flex-1 flex flex-col w-full">
                {/* PDV Header */}
                <div className="p-4 bg-[#1a1a1d] border-b border-white/10 flex items-center justify-between gap-4">
                    <div className="flex-1 relative max-w-xl">
                         <SearchIcon className="absolute left-3 top-3 text-gray-500" size={20}/>
                         <input 
                            autoFocus
                            className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 p-2.5 outline-none focus:border-vm-purple transition-all text-white placeholder-gray-500"
                            placeholder="Buscar produto (Nome ou Código)"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-3">
                         <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg border border-white/5">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-xs font-bold text-gray-400">CAIXA ABERTO</span>
                         </div>
                         <button onClick={onLogout} className="bg-red-500/10 text-red-500 p-2.5 rounded-xl hover:bg-red-500 hover:text-white transition-colors"><LogOut size={20}/></button>
                    </div>
                </div>
                
                {/* Categories */}
                <div className="flex gap-2 p-3 overflow-x-auto bg-[#151518] border-b border-white/10 scrollbar-hide shrink-0">
                    {CATEGORIES.map(c => (
                        <button 
                            key={c.id} 
                            onClick={() => setSelectedCategory(c.id)}
                            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all ${selectedCategory === c.id ? 'bg-vm-purple text-white shadow-lg shadow-purple-500/20' : 'bg-[#1a1a1d] border border-white/5 text-gray-400 hover:bg-white/10'}`}
                        >
                            <c.icon size={16}/> {c.name}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 content-start pb-24 md:pb-4">
                    {filteredProducts.map((p: Product) => (
                        <button 
                            key={p.id} 
                            onClick={() => onAddToCart(p)}
                            className="bg-[#1a1a1d] border border-white/5 hover:border-vm-purple/50 rounded-2xl p-0 overflow-hidden flex flex-col group transition-all active:scale-95 shadow-sm hover:shadow-xl hover:shadow-purple-500/5"
                        >
                            <div className="h-28 w-full bg-black/50 relative">
                                <img src={p.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt={p.name}/>
                                <div className="absolute top-2 right-2 bg-black/80 backdrop-blur text-white text-xs font-bold px-2 py-1 rounded-lg border border-white/10">R$ {p.price.toFixed(2)}</div>
                            </div>
                            <div className="p-3 flex-1 flex flex-col justify-between w-full text-left">
                                <div className="font-bold text-sm leading-tight text-gray-200 group-hover:text-white mb-2">{p.name}</div>
                                <div className="w-full py-1.5 bg-white/5 rounded-lg text-center text-[10px] font-bold text-gray-400 group-hover:bg-vm-purple group-hover:text-white transition-colors">ADICIONAR</div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Cart Drawer Toggle (Mobile FAB) */}
            {!isCartOpen && (
                 <button 
                    onClick={() => setIsCartOpen(true)}
                    className="fixed bottom-6 right-6 md:hidden w-16 h-16 bg-vm-purple rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/50 z-50 animate-bounce"
                >
                    <ShoppingBag className="text-white" />
                    {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#111113]">{cart.reduce((a,b)=>a+b.quantity,0)}</span>}
                </button>
            )}

            {/* Checkout Drawer (Slide Over) */}
            <div className={`fixed inset-y-0 right-0 w-full md:w-[450px] bg-white text-gray-900 z-40 transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0 md:static md:w-[400px] md:border-l md:border-white/10'}`}>
                 
                 {/* Drawer Header */}
                 <div className="bg-[#1a1a1d] text-white p-4 flex justify-between items-center border-b border-white/10">
                     <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-vm-purple rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                             <ShoppingCart size={20} />
                         </div>
                         <div>
                             <h2 className="font-black text-lg leading-none">Cupom Fiscal</h2>
                             <span className="text-xs text-gray-400">{cart.length} itens</span>
                         </div>
                     </div>
                     <div className="flex gap-2">
                         <button onClick={onClearCart} title="Limpar" className="w-10 h-10 bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-white rounded-xl flex items-center justify-center transition-colors"><Trash2 size={18}/></button>
                         <button onClick={() => setIsCartOpen(false)} className="md:hidden w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center"><X size={20}/></button>
                     </div>
                 </div>

                 {/* Cart Items List */}
                 <div className="flex-1 overflow-y-auto bg-gray-50 p-2 space-y-1">
                     {cart.length === 0 ? (
                         <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-60">
                             <Package size={64} strokeWidth={1} className="mb-2"/>
                             <p>Caixa Livre</p>
                         </div>
                     ) : cart.map((item: CartItem) => (
                         <div key={item.id} className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center">
                             <div className="flex items-center gap-3">
                                 <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-sm">{item.quantity}x</div>
                                 <div>
                                     <div className="font-bold text-sm leading-tight text-gray-800">{item.name}</div>
                                     <div className="text-[10px] text-gray-500">R$ {item.price.toFixed(2)} un</div>
                                 </div>
                             </div>
                             <div className="flex items-center gap-3">
                                 <div className="font-bold text-gray-900">R$ {(item.price*item.quantity).toFixed(2)}</div>
                                 <div className="flex flex-col gap-1">
                                     <button onClick={() => onUpdateCartQty(item.id, 1)} className="w-6 h-6 bg-green-100 text-green-700 rounded flex items-center justify-center hover:bg-green-200"><Plus size={12}/></button>
                                     <button onClick={() => onUpdateCartQty(item.id, -1)} className="w-6 h-6 bg-red-100 text-red-700 rounded flex items-center justify-center hover:bg-red-200"><Minus size={12}/></button>
                                 </div>
                             </div>
                         </div>
                     ))}
                 </div>

                 {/* Footer / Totals */}
                 <div className="bg-white border-t border-gray-200 p-4 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-10">
                     <div className="space-y-2 mb-4">
                         <div className="flex justify-between text-sm text-gray-500">
                             <span>Subtotal</span>
                             <span>R$ {cartSubtotal.toFixed(2)}</span>
                         </div>
                         <div className="flex justify-between items-center text-sm text-red-500 font-bold">
                             <span>Desconto</span>
                             <div className="flex items-center gap-1">
                                 <span>- R$</span>
                                 <input 
                                    type="number" 
                                    value={discountValue}
                                    onChange={e => setDiscountValue(e.target.value)}
                                    placeholder="0.00"
                                    className="w-16 bg-red-50 border border-red-100 rounded px-1 py-0.5 text-right outline-none focus:border-red-300"
                                 />
                             </div>
                         </div>
                         <div className="flex justify-between items-center">
                             <div className="flex items-center gap-2">
                                 <span className="text-xl font-black text-gray-900">TOTAL</span>
                                 <button 
                                    onClick={() => setSendToKitchen(!sendToKitchen)}
                                    className={`px-2 py-1 rounded text-[10px] font-bold border flex items-center gap-1 transition-colors ${sendToKitchen ? 'bg-orange-100 border-orange-200 text-orange-700' : 'bg-gray-100 border-gray-200 text-gray-500'}`}
                                 >
                                     <ChefHat size={12}/> {sendToKitchen ? 'COZINHA SIM' : 'COZINHA NÃO'}
                                 </button>
                             </div>
                             <span className="text-2xl font-black text-vm-purple">R$ {cartTotal.toFixed(2)}</span>
                         </div>
                     </div>

                     <div className="grid grid-cols-2 gap-2">
                         <button onClick={() => handleInitialPaymentClick('CASH')} disabled={cart.length===0} className="p-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold flex flex-col items-center disabled:opacity-50"><Banknote size={20}/> DINHEIRO</button>
                         <button onClick={() => handleInitialPaymentClick('DEBIT')} disabled={cart.length===0} className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex flex-col items-center disabled:opacity-50"><CreditCard size={20}/> DÉBITO</button>
                         <button onClick={() => handleInitialPaymentClick('CREDIT')} disabled={cart.length===0} className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex flex-col items-center disabled:opacity-50"><CreditCard size={20}/> CRÉDITO</button>
                         <button onClick={() => handleInitialPaymentClick('PIX')} disabled={cart.length===0} className="p-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold flex flex-col items-center disabled:opacity-50"><QrCode size={20}/> PIX</button>
                     </div>
                 </div>
            </div>

            {/* Payment Modal */}
            {paymentModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl animate-scaleIn">
                        <div className="bg-[#1a1a1d] p-4 text-white flex justify-between items-center">
                            <h3 className="font-bold text-lg">Finalizar Venda</h3>
                            <button onClick={() => setPaymentModalOpen(false)} className="text-gray-400 hover:text-white"><X/></button>
                        </div>
                        <div className="p-6">
                            <div className="text-center mb-6">
                                <div className="text-sm text-gray-500 font-bold uppercase">Total a Pagar</div>
                                <div className="text-4xl font-black text-vm-purple">R$ {cartTotal.toFixed(2)}</div>
                                <div className="mt-2 inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-600">
                                    {selectedPaymentMethod === 'CASH' ? 'DINHEIRO' : selectedPaymentMethod === 'PIX' ? 'PIX' : 'CARTÃO'}
                                </div>
                            </div>

                            {selectedPaymentMethod === 'CASH' && (
                                <div className="mb-6">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Valor Recebido</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">R$</span>
                                        <input 
                                            autoFocus
                                            type="number" 
                                            value={cashValue}
                                            onChange={e => setCashValue(e.target.value)}
                                            className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl py-3 pl-10 pr-4 text-xl font-bold text-gray-900 outline-none focus:border-green-500 transition-colors"
                                            placeholder="0.00"
                                        />
                                    </div>
                                    {parseFloat(cashValue) > cartTotal && (
                                        <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-100 flex justify-between items-center">
                                            <span className="font-bold text-green-700">TROCO</span>
                                            <span className="font-black text-xl text-green-700">R$ {(parseFloat(cashValue) - cartTotal).toFixed(2)}</span>
                                        </div>
                                    )}
                                </div>
                            )}

                            <button 
                                onClick={confirmPayment}
                                className="w-full bg-vm-purple hover:bg-purple-700 text-white py-4 rounded-xl font-bold shadow-xl shadow-purple-500/20 text-lg"
                            >
                                CONFIRMAR E IMPRIMIR
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Receipt Print Hidden Area */}
            {lastOrder && <ReceiptPrint {...lastOrder} />}
        </div>
    );
};

const PixScreen = ({ total, onFinish }: any) => {
    return (
        <div className="min-h-screen bg-[#F3F0FF] p-6 flex flex-col items-center justify-center text-center">
            <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-sm">
                <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <QrCode size={32}/>
                </div>
                <h2 className="text-2xl font-black text-gray-900 mb-2">Pagamento via Pix</h2>
                <p className="text-gray-500 mb-6">Escaneie o QR Code ou copie a chave abaixo para pagar.</p>
                
                <div className="bg-gray-100 p-4 rounded-xl mb-6">
                    <div className="aspect-square bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4">
                         {/* Mock QR */}
                         <QrCode size={150} className="text-gray-900"/>
                    </div>
                    <p className="text-xs font-mono text-gray-500 break-all">00020126360014BR.GOV.BCB.PIX0114+551199999999520400005303986540510.005802BR5913VM SHOP6008SAO PAULO62070503***6304E2CA</p>
                </div>

                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-bold mb-3 flex items-center justify-center gap-2">
                    <Copy size={18}/> Copiar Chave Pix
                </button>
                <button onClick={onFinish} className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-green-500/30">
                    Já realizei o pagamento
                </button>
            </div>
        </div>
    );
};

const ProductDetailModal = ({ product, onClose, onAdd }: any) => {
    const [qty, setQty] = useState(1);
    
    if(!product) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto" onClick={onClose} />
            <div className="bg-white w-full max-w-md rounded-t-[2rem] sm:rounded-[2rem] overflow-hidden shadow-2xl pointer-events-auto animate-slideUp">
                <div className="h-64 relative">
                    <img src={product.image} className="w-full h-full object-cover" alt={product.name}/>
                    <button onClick={onClose} className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/40 transition-colors">
                        <X size={24}/>
                    </button>
                </div>
                <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                        <h2 className="text-2xl font-black text-gray-900">{product.name}</h2>
                        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold text-lg">
                            R$ {product.price.toFixed(2)}
                        </div>
                    </div>
                    <p className="text-gray-500 leading-relaxed mb-6">{product.description}</p>
                    
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center bg-gray-100 rounded-xl p-1">
                            <button onClick={() => setQty(Math.max(1, qty-1))} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-white rounded-lg transition-colors"><Minus size={20}/></button>
                            <span className="w-12 text-center font-black text-lg">{qty}</span>
                            <button onClick={() => setQty(qty+1)} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-white rounded-lg transition-colors"><Plus size={20}/></button>
                        </div>
                        <button onClick={() => { onAdd(product, qty); onClose(); }} className="flex-1 bg-vm-purple hover:bg-purple-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2">
                            <span>Adicionar</span>
                            <span className="bg-white/20 px-2 py-0.5 rounded text-sm">R$ {(product.price * qty).toFixed(2)}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const HomeScreen = ({ user, products, onNavigate, onAddToCart, onProductClick }: any) => {
    const [activeCat, setActiveCat] = useState('all');

    const filtered = activeCat === 'all' ? products : products.filter((p: Product) => p.category === activeCat);

    return (
        <div className="pb-32 animate-fadeIn">
            {/* Header */}
            <div className="p-6 flex justify-between items-center bg-white shadow-sm">
                <div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Bem-vindo</div>
                    <div className="text-xl font-black text-gray-900 flex items-center gap-1">
                        {user?.name?.split(' ')[0] || 'Visitante'} <Sparkles size={16} className="text-yellow-500"/>
                    </div>
                </div>
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                    <Bell size={20}/>
                </div>
            </div>

            {/* Banners */}
            <div className="mt-4 px-6 overflow-x-auto scrollbar-hide flex gap-4 pb-4">
                {PROMO_BANNERS.map(b => (
                    <div key={b.id} className="w-72 h-36 shrink-0 rounded-2xl relative overflow-hidden shadow-lg group">
                        <img src={b.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={b.title}/>
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent p-5 flex flex-col justify-center text-white">
                            <div className="bg-white/20 backdrop-blur-sm w-fit p-2 rounded-lg mb-2"><b.icon size={16}/></div>
                            <h3 className="font-black text-xl uppercase leading-none mb-1">{b.title}</h3>
                            <p className="text-sm font-medium opacity-90">{b.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Categories */}
            <div className="mt-2 px-6 overflow-x-auto scrollbar-hide flex gap-3 pb-2">
                {CATEGORIES.map(c => (
                    <button 
                        key={c.id} 
                        onClick={() => setActiveCat(c.id)}
                        className={`flex flex-col items-center gap-2 min-w-[70px] p-3 rounded-2xl transition-all ${activeCat === c.id ? 'bg-vm-purple text-white shadow-lg shadow-purple-500/30 scale-105' : 'bg-white text-gray-500 border border-gray-100'}`}
                    >
                        <c.icon size={24} />
                        <span className="text-[10px] font-bold">{c.name}</span>
                    </button>
                ))}
            </div>

            {/* Products Grid */}
            <div className="p-6">
                <div className="flex justify-between items-end mb-4">
                    <h2 className="text-xl font-black text-gray-900">Populares</h2>
                    <button onClick={() => onNavigate(ScreenName.PRODUCTS)} className="text-vm-purple text-sm font-bold">Ver todos</button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    {filtered.map((p: Product) => (
                        <div key={p.id} onClick={() => onProductClick(p)} className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3 group active:scale-95 transition-all">
                            <div className="aspect-square rounded-xl overflow-hidden relative bg-gray-100">
                                <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={p.name}/>
                                <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur text-xs font-black px-2 py-1 rounded-lg shadow-sm">
                                    {p.rating} ★
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-sm leading-tight line-clamp-2 mb-1">{p.name}</h3>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="font-black text-lg text-vm-purple">R$ {p.price.toFixed(0)}<span className="text-xs align-top">,{p.price.toFixed(2).split('.')[1]}</span></span>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); onAddToCart(p); }}
                                        className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-vm-purple transition-colors shadow-lg"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const ClientCartScreen = ({ cart, onUpdateQty, onRemove, onCheckout, onBack, user, onLoginNavigation }: any) => {
    const total = cart.reduce((acc: number, item: CartItem) => acc + (item.price * item.quantity), 0);
    
    return (
        <div className="min-h-screen bg-white pb-32">
            <div className="bg-[#F3F0FF] p-6 pb-10 rounded-b-[2.5rem] relative">
                <div className="flex items-center gap-4 mb-6">
                    <button onClick={onBack} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-600">
                        <ArrowRight className="rotate-180" size={20}/>
                    </button>
                    <h1 className="text-2xl font-black text-gray-900">Meu Carrinho</h1>
                </div>
                {/* Minimalist Summary Card */}
                <div className="bg-white p-6 rounded-3xl shadow-xl shadow-purple-100 mx-auto">
                    <div className="flex justify-between text-gray-500 text-sm font-bold mb-1">
                        <span>Total estimado</span>
                        <span>{cart.length} itens</span>
                    </div>
                    <div className="text-4xl font-black text-gray-900">
                        R$ {total.toFixed(2)}
                    </div>
                </div>
            </div>

            <div className="p-6 -mt-4 space-y-4">
                {cart.length === 0 ? (
                     <div className="text-center py-10 text-gray-400">
                         <ShoppingBag size={64} className="mx-auto mb-4 opacity-20"/>
                         <p className="font-medium">Seu carrinho está vazio</p>
                     </div>
                ) : cart.map((item: CartItem) => (
                    <div key={item.id} className="flex gap-4 items-center">
                        <img src={item.image} className="w-20 h-20 rounded-2xl object-cover bg-gray-100" alt={item.name}/>
                        <div className="flex-1">
                            <h3 className="font-bold text-gray-900">{item.name}</h3>
                            <div className="text-vm-purple font-black">R$ {item.price.toFixed(2)}</div>
                        </div>
                        <div className="flex flex-col items-center gap-2 bg-gray-50 rounded-xl p-1">
                            <button onClick={() => onUpdateQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-gray-600"><Plus size={14}/></button>
                            <span className="font-bold text-sm">{item.quantity}</span>
                            <button onClick={() => onUpdateQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-gray-600"><Minus size={14}/></button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="fixed bottom-0 left-0 w-full p-6 bg-white border-t border-gray-100">
                <button 
                    onClick={() => user ? onCheckout() : onLoginNavigation()}
                    disabled={cart.length === 0}
                    className="w-full bg-vm-purple hover:bg-purple-700 disabled:opacity-50 text-white py-4 rounded-2xl font-bold shadow-xl shadow-purple-500/20 flex items-center justify-between px-6"
                >
                    <span>{user ? 'Confirmar Pedido' : 'Faça Login para Finalizar'}</span>
                    <ArrowRight size={20}/>
                </button>
            </div>
        </div>
    );
};

const CheckoutScreen = ({ cart, total, onBack, onConfirmOrder, coupons, usedCoupons }: any) => {
    const [selectedMethod, setSelectedMethod] = useState<'PIX' | 'CREDIT' | 'CASH'>('PIX');
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

    const handleApplyCoupon = () => {
        const coupon = coupons.find((c: Coupon) => c.code === couponCode && c.isActive);
        if(coupon && !usedCoupons.includes(coupon.code)) {
            setAppliedCoupon(coupon);
        } else {
            alert('Cupom inválido ou já utilizado.');
        }
    };

    const discount = appliedCoupon 
        ? (appliedCoupon.discountPercent ? total * (appliedCoupon.discountPercent/100) : (appliedCoupon.discountValue || 0)) 
        : 0;
    
    const finalTotal = Math.max(0, total - discount);

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <div className="p-6 bg-[#F3F0FF]">
                 <div className="flex items-center gap-4">
                    <button onClick={onBack} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-600">
                        <ArrowRight className="rotate-180" size={20}/>
                    </button>
                    <h1 className="text-2xl font-black text-gray-900">Pagamento</h1>
                </div>
            </div>
            
            <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                {/* Payment Methods */}
                <div>
                    <h3 className="font-bold text-gray-900 mb-3">Como deseja pagar?</h3>
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            { id: 'PIX', label: 'Pix', icon: QrCode },
                            { id: 'CREDIT', label: 'Cartão', icon: CreditCard },
                            { id: 'CASH', label: 'Dinheiro', icon: Banknote },
                        ].map(m => (
                            <button 
                                key={m.id}
                                onClick={() => setSelectedMethod(m.id as any)}
                                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all ${selectedMethod === m.id ? 'border-vm-purple bg-purple-50 text-vm-purple' : 'border-gray-100 bg-gray-50 text-gray-400'}`}
                            >
                                <m.icon size={24}/>
                                <span className="font-bold text-xs">{m.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Coupon */}
                <div className="bg-gray-50 p-4 rounded-2xl">
                    <h3 className="font-bold text-gray-900 mb-2 text-sm">Cupom de Desconto</h3>
                    <div className="flex gap-2">
                        <div className="flex-1 relative">
                            <Ticket className="absolute left-3 top-3 text-gray-400" size={18}/>
                            <input 
                                value={couponCode}
                                onChange={e => setCouponCode(e.target.value.toUpperCase())}
                                placeholder="Código"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border-none outline-none text-sm font-bold uppercase tracking-wider"
                            />
                        </div>
                        <button onClick={handleApplyCoupon} className="bg-black text-white px-4 rounded-xl font-bold text-xs">Aplicar</button>
                    </div>
                    {appliedCoupon && (
                        <div className="mt-2 text-green-600 text-xs font-bold flex items-center gap-1">
                            <CheckCircle size={12}/> Desconto de {appliedCoupon.discountPercent ? `${appliedCoupon.discountPercent}%` : `R$ ${appliedCoupon.discountValue}`} aplicado!
                        </div>
                    )}
                </div>

                {/* Summary */}
                <div className="border-t border-dashed border-gray-200 pt-4 space-y-2">
                     <div className="flex justify-between text-gray-500 text-sm">
                         <span>Subtotal</span>
                         <span>R$ {total.toFixed(2)}</span>
                     </div>
                     {discount > 0 && (
                         <div className="flex justify-between text-green-600 text-sm font-bold">
                             <span>Desconto</span>
                             <span>- R$ {discount.toFixed(2)}</span>
                         </div>
                     )}
                     <div className="flex justify-between text-xl font-black text-gray-900 pt-2">
                         <span>Total</span>
                         <span>R$ {finalTotal.toFixed(2)}</span>
                     </div>
                </div>
            </div>

            <div className="p-6 border-t border-gray-100">
                <button 
                    onClick={() => onConfirmOrder(selectedMethod, '', appliedCoupon?.code, discount)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold shadow-xl shadow-green-500/20"
                >
                    Finalizar Pedido
                </button>
            </div>
        </div>
    );
};

const TrackingScreen = ({ order, onBack }: any) => {
    if(!order) return null;

    const steps = [
        { status: 'pending', label: 'Pedido Recebido', icon: Clipboard },
        { status: 'preparing', label: 'Em Preparo', icon: ChefHat },
        { status: 'ready', label: 'Pronto', icon: CheckCircle },
        { status: 'delivering', label: 'Saiu para Entrega', icon: Bike },
        { status: 'delivered', label: 'Entregue', icon: Home },
    ];

    const currentIdx = steps.findIndex(s => s.status === order.status);

    return (
        <div className="min-h-screen bg-white">
            <div className="bg-vm-purple p-6 pb-12 rounded-b-[3rem] text-white">
                 <div className="flex items-center gap-4 mb-8">
                    <button onClick={onBack} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                        <ArrowRight className="rotate-180" size={20}/>
                    </button>
                    <h1 className="text-xl font-bold">Acompanhar Pedido</h1>
                </div>
                <div className="text-center">
                    <div className="text-white/70 font-bold uppercase tracking-wider text-xs mb-1">Tempo Estimado</div>
                    <div className="text-4xl font-black mb-2">35-45 min</div>
                    <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-bold">Pedido #{order.id.slice(-4)}</div>
                </div>
            </div>

            <div className="px-8 -mt-6">
                <div className="bg-white p-6 rounded-3xl shadow-xl shadow-purple-100 space-y-8">
                    {steps.map((step, idx) => {
                        const isCompleted = idx <= currentIdx;
                        const isCurrent = idx === currentIdx;

                        return (
                            <div key={step.status} className="flex gap-4 relative">
                                {idx !== steps.length - 1 && (
                                    <div className={`absolute left-[19px] top-10 w-[2px] h-12 ${idx < currentIdx ? 'bg-green-500' : 'bg-gray-100'}`} />
                                )}
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 ${isCompleted ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                    <step.icon size={20} />
                                </div>
                                <div className={isCurrent ? 'opacity-100' : 'opacity-50'}>
                                    <h4 className="font-bold text-gray-900">{step.label}</h4>
                                    {isCurrent && <p className="text-xs text-gray-500 mt-1 animate-pulse">Processando...</p>}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            
            {/* Help Button */}
            <div className="p-8 mt-4">
                 <button className="w-full py-4 rounded-2xl bg-gray-50 text-gray-600 font-bold flex items-center justify-center gap-2 hover:bg-gray-100">
                     <HelpCircle size={20}/> Preciso de Ajuda
                 </button>
            </div>
        </div>
    );
};

const AuthScreen = ({ onLogin, users, onBack }: any) => {
    const [phone, setPhone] = useState('');
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        // Simple authentication: find user by phone
        const user = users.find((u: UserType) => u.phone === phone);
        if (user) {
            if (user.password === pin) { 
                onLogin(user);
            } else {
                setError('Senha incorreta.');
            }
        } else {
            // Register new Client
            if (phone.length >= 8 && pin.length >= 4) {
                 const newUser = { 
                    id: `user_${Date.now()}`, 
                    name: `Cliente ${phone.slice(-4)}`, 
                    phone: phone, 
                    role: 'CLIENT', 
                    password: pin,
                    addresses: [], 
                    usedCoupons: [], 
                    ordersCount: 0 
                };
                onLogin(newUser);
            } else {
                setError('Telefone inválido ou senha muito curta.');
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#F3F0FF] flex flex-col items-center justify-center p-6 text-gray-900 relative">
            {/* Back Button for Guests who clicked by mistake */}
            <button 
                onClick={onBack}
                className="absolute top-6 right-6 p-2 bg-white rounded-full text-gray-400 hover:text-vm-purple shadow-sm transition-colors"
            >
                <X size={24} />
            </button>

            <div className="w-full max-w-sm">
                <div className="text-center mb-10">
                    <div className="w-24 h-24 bg-gradient-to-br from-vm-purple to-vm-light rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-500/30 transform rotate-3">
                         <ShoppingBag size={48} className="text-white"/>
                    </div>
                    <h1 className="text-4xl font-black mb-2 text-vm-purple">VM Shop</h1>
                    <p className="text-gray-500 font-medium">Faça login para continuar</p>
                </div>

                <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-purple-100 space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">WhatsApp / Login</label>
                        <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
                            <input 
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 pl-12 pr-4 font-bold text-gray-900 outline-none focus:border-vm-purple transition-all"
                                placeholder="Seu número"
                            />
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Senha (PIN)</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
                            <input 
                                type="password"
                                value={pin}
                                onChange={e => setPin(e.target.value)}
                                className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-4 pl-12 pr-4 font-bold text-gray-900 outline-none focus:border-vm-purple transition-all"
                                placeholder="******"
                            />
                        </div>
                    </div>

                    {error && <div className="p-3 bg-red-50 text-red-500 text-sm font-bold rounded-xl text-center">{error}</div>}

                    <button 
                        onClick={handleLogin}
                        className="w-full bg-vm-purple hover:bg-purple-700 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-purple-500/20 transition-all active:scale-95"
                    >
                        Entrar / Cadastrar
                    </button>
                </div>

                <div className="mt-8 text-center text-xs text-gray-400 font-medium">
                    <p>Esqueceu a senha? Entre em contato com o suporte.</p>
                </div>
            </div>
        </div>
    );
};

const KitchenScreen = ({ orders, onUpdateStatus, onBack }: any) => {
    const activeOrders = orders.filter((o: Order) => ['pending', 'preparing'].includes(o.status) && o.sentToKitchen !== false);

    return (
        <div className="min-h-screen bg-[#111113] text-white p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold flex items-center gap-3">
                    <ChefHat className="text-orange-500" size={32}/> Cozinha
                </h1>
                <button onClick={onBack} className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-bold">Sair</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeOrders.length === 0 && (
                    <div className="col-span-full text-center py-20 text-gray-600">
                        <Coffee size={48} className="mx-auto mb-4 opacity-50"/>
                        <p>Tudo tranquilo por aqui.</p>
                    </div>
                )}
                {activeOrders.map((order: Order) => (
                    <div key={order.id} className={`bg-[#1a1a1d] border-l-4 rounded-r-xl p-4 ${order.status === 'pending' ? 'border-red-500' : 'border-orange-500'}`}>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-lg">#{order.id.slice(-4)}</h3>
                                <div className="text-xs text-gray-400">{new Date(order.timestamp).toLocaleTimeString()}</div>
                            </div>
                            <div className={`px-2 py-1 rounded text-xs font-bold uppercase ${order.status === 'pending' ? 'bg-red-500/20 text-red-500' : 'bg-orange-500/20 text-orange-500'}`}>
                                {order.status === 'pending' ? 'Pendente' : 'Preparando'}
                            </div>
                        </div>
                        
                        <div className="space-y-2 mb-6 border-t border-b border-white/5 py-4">
                            {order.items.map((item: CartItem) => (
                                <div key={item.id} className="flex gap-2">
                                    <span className="font-bold text-gray-400">{item.quantity}x</span>
                                    <span>{item.name}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-2">
                            {order.status === 'pending' && (
                                <button onClick={() => onUpdateStatus(order.id, 'preparing')} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-bold">
                                    Iniciar Preparo
                                </button>
                            )}
                            {order.status === 'preparing' && (
                                <button onClick={() => onUpdateStatus(order.id, 'ready')} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold">
                                    Pronto!
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const DeliveryScreen = ({ orders, onUpdateStatus, onBack }: any) => {
    const deliveryOrders = orders.filter((o: Order) => ['ready', 'delivering'].includes(o.status) && o.type === 'DELIVERY');

    return (
         <div className="min-h-screen bg-[#111113] text-white p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold flex items-center gap-3">
                    <Bike className="text-blue-500" size={32}/> Entregas
                </h1>
                <button onClick={onBack} className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-bold">Sair</button>
            </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {deliveryOrders.length === 0 && (
                    <div className="col-span-full text-center py-20 text-gray-600">
                        <Bike size={48} className="mx-auto mb-4 opacity-50"/>
                        <p>Nenhuma entrega pendente.</p>
                    </div>
                )}
                {deliveryOrders.map((order: Order) => (
                    <div key={order.id} className="bg-[#1a1a1d] rounded-xl p-4 border border-white/5">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-lg">{order.customerName}</h3>
                                <div className="text-xs text-gray-400">#{order.id.slice(-4)} • {order.address}</div>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center">
                                <MapPin size={20}/>
                            </div>
                        </div>

                         <div className="flex gap-2 mt-4">
                            {order.status === 'ready' && (
                                <button onClick={() => onUpdateStatus(order.id, 'delivering')} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold">
                                    Sair para Entrega
                                </button>
                            )}
                            {order.status === 'delivering' && (
                                <button onClick={() => onUpdateStatus(order.id, 'delivered')} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold">
                                    Confirmar Entrega
                                </button>
                            )}
                        </div>
                    </div>
                ))}
             </div>
         </div>
    );
};

// MAIN APP COMPONENT
export default function App() {
    const [user, setUser] = useState<UserType | null>(null);
    const [screen, setScreen] = useState<ScreenName>(ScreenName.HOME); // Start at HOME now
    const [cart, setCart] = useState<CartItem[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
    const [users, setUsers] = useState<UserType[]>(INITIAL_USERS); // Central User State
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [lastOrder, setLastOrder] = useState<Order | null>(null);

    const handleLogin = (u: UserType) => {
        // If it's a new guest user, add to state
        if (!users.find(existing => existing.id === u.id)) {
            setUsers(prev => [...prev, u]);
        }
        setUser(u);
        switch(u.role) {
            case 'ADMIN': setScreen(ScreenName.ADMIN); break;
            case 'KITCHEN': setScreen(ScreenName.KITCHEN); break;
            case 'PDV': setScreen(ScreenName.PDV); break;
            case 'DELIVERY': setScreen(ScreenName.DELIVERY); break;
            default: setScreen(ScreenName.HOME);
        }
    };

    const handleAddToCart = (product: Product, quantity: number = 1) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if(existing) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
            }
            return [...prev, { ...product, quantity }];
        });
        setSelectedProduct(null);
        setToastMessage(`${quantity}x ${product.name} adicionado!`);
        setShowToast(true);
    };

    const handleRemoveFromCart = (id: string) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const handleUpdateCartQty = (id: string, delta: number) => {
        setCart(prev => prev.map(item => {
            if(item.id === id) {
                const newQty = Math.max(0, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }).filter(item => item.quantity > 0));
    };

    const handleCheckout = (method: 'PIX'|'CREDIT'|'DEBIT'|'CASH', total: number, discount: number, extras?: any) => {
        if(!user) return;
        
        const newOrder: Order = {
            id: `ORD-${Date.now()}`,
            customerId: user.id,
            customerName: user.name,
            customerPhone: user.phone,
            items: [...cart],
            total: total,
            status: 'pending',
            method: method as any,
            address: user.addresses[0]?.label || 'Balcão',
            timestamp: Date.now(),
            discount,
            appliedCoupon: extras?.appliedCoupon,
            type: user.role === 'PDV' ? 'PDV' : 'DELIVERY',
            cashReceived: extras?.cashReceived,
            change: extras?.change,
            sentToKitchen: extras?.sentToKitchen
        };

        setOrders(prev => [newOrder, ...prev]);
        setLastOrder(newOrder);
        setCart([]);
        
        // Update user order count
        const updatedUsers = users.map(u => u.id === user.id ? { ...u, ordersCount: u.ordersCount + 1 } : u);
        setUsers(updatedUsers);
        
        if(user.role === 'PDV') {
            setToastMessage('Venda Finalizada!');
            setShowToast(true);
        } else {
            if(method === 'PIX') {
                setScreen(ScreenName.PAYMENT_PIX);
            } else {
                 setScreen(ScreenName.TRACKING);
            }
        }
    };

    const handleKitchenUpdate = (orderId: string, status: OrderStatus) => {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    };
    
    // Product Management Handlers
    const handleUpdateProduct = (updatedProduct: Product) => {
        setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
        setToastMessage('Produto Atualizado!');
        setShowToast(true);
    };

    const handleAddProduct = (newProduct: Product) => {
        setProducts(prev => [...prev, newProduct]);
        setToastMessage('Produto Criado!');
        setShowToast(true);
    };

    const handleDeleteProduct = (id: string) => {
        if(confirm('Tem certeza?')) {
            setProducts(prev => prev.filter(p => p.id !== id));
            setToastMessage('Produto Excluído!');
            setShowToast(true);
        }
    };

    const handleAddUser = (newUser: UserType) => {
        setUsers(prev => [...prev, newUser]);
        setToastMessage('Usuário Cadastrado!');
        setShowToast(true);
    };

    // --- RENDER ---
    
    if(screen === ScreenName.AUTH) {
        return <AuthScreen onLogin={handleLogin} users={users} onBack={() => setScreen(ScreenName.HOME)} />;
    }

    if(screen === ScreenName.KITCHEN) {
        return <KitchenScreen orders={orders} onUpdateStatus={handleKitchenUpdate} onBack={() => setScreen(ScreenName.HOME)} />;
    }
    
    if(screen === ScreenName.DELIVERY) {
        return <DeliveryScreen orders={orders} onUpdateStatus={handleKitchenUpdate} onBack={() => setScreen(ScreenName.HOME)} />;
    }

    if(screen === ScreenName.ADMIN) {
        return <AdminScreen 
            orders={orders} 
            products={products}
            users={users}
            onUpdateProduct={handleUpdateProduct}
            onAddProduct={handleAddProduct}
            onDeleteProduct={handleDeleteProduct}
            onAddUser={handleAddUser}
            onBack={() => setScreen(ScreenName.HOME)} 
        />;
    }

    if(screen === ScreenName.PDV) {
        return <PDVScreen 
            products={products} 
            cart={cart} 
            onAddToCart={(p: Product) => handleAddToCart(p, 1)}
            onRemoveFromCart={handleRemoveFromCart}
            onUpdateCartQty={handleUpdateCartQty}
            onCheckout={handleCheckout}
            onLogout={() => setScreen(ScreenName.HOME)}
            lastOrder={lastOrder}
            onClearCart={() => setCart([])}
        />;
    }

    if(screen === ScreenName.PAYMENT_PIX) {
        return <PixScreen total={0} onFinish={() => setScreen(ScreenName.TRACKING)} />;
    }
    
    // Default Client View Wrapper
    return (
        <div className="font-sans antialiased text-gray-900 bg-[#F3F0FF] min-h-screen max-w-md mx-auto relative shadow-2xl">
            {screen === ScreenName.HOME && (
                <HomeScreen 
                    user={user} 
                    products={products} 
                    onNavigate={setScreen} 
                    onAddToCart={handleAddToCart}
                    onProductClick={setSelectedProduct}
                />
            )}

             {screen === ScreenName.PRODUCTS && (
                <ProductsScreen
                    products={products}
                    onAddToCart={handleAddToCart}
                    onProductClick={setSelectedProduct}
                />
            )}

            {screen === ScreenName.PROFILE && (
                <ProfileScreen 
                    user={user} 
                    onLogout={() => setUser(null)}
                    onLoginNavigation={() => setScreen(ScreenName.AUTH)} 
                />
            )}

            {screen === ScreenName.COUPONS && (
                <CouponsScreen coupons={INITIAL_COUPONS} />
            )}

            {screen === ScreenName.CART && (
                <ClientCartScreen 
                    cart={cart}
                    onUpdateQty={handleUpdateCartQty}
                    onRemove={handleRemoveFromCart}
                    onCheckout={() => setScreen(ScreenName.CHECKOUT)}
                    onBack={() => setScreen(ScreenName.HOME)}
                    user={user}
                    onLoginNavigation={() => setScreen(ScreenName.AUTH)}
                />
            )}

            {screen === ScreenName.CHECKOUT && (
                <CheckoutScreen 
                    cart={cart}
                    total={cart.reduce((a,b) => a + (b.price*b.quantity), 0)}
                    onBack={() => setScreen(ScreenName.CART)}
                    onConfirmOrder={(method: any, notes: string, coupon: string, discount: number) => handleCheckout(method, cart.reduce((a,b) => a + (b.price*b.quantity), 0), discount, { appliedCoupon: coupon })}
                    coupons={INITIAL_COUPONS}
                    usedCoupons={user?.usedCoupons || []}
                />
            )}

            {screen === ScreenName.TRACKING && (
                <TrackingScreen 
                    order={lastOrder || orders.find(o => o.customerId === user?.id)} 
                    onBack={() => setScreen(ScreenName.HOME)} 
                />
            )}

            {/* Global Elements */}
            <Toast message={toastMessage} visible={showToast} onHide={() => setShowToast(false)} />
            
            <ProductDetailModal 
                product={selectedProduct!} 
                onClose={() => setSelectedProduct(null)} 
                onAdd={handleAddToCart} 
            />

            {/* Bottom Nav (Client Navigation) */}
            {[ScreenName.HOME, ScreenName.PRODUCTS, ScreenName.COUPONS, ScreenName.PROFILE, ScreenName.TRACKING].includes(screen) && (
                <div className="fixed bottom-0 w-full max-w-md bg-[#0f0f11]/90 backdrop-blur-md border-t border-white/5 p-2 px-6 pb-6 rounded-t-[2rem] flex justify-between items-center z-40 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                    <NavIcon icon={Home} label="Início" isActive={screen === ScreenName.HOME} onClick={() => setScreen(ScreenName.HOME)} />
                    <NavIcon icon={SearchIcon} label="Buscar" isActive={screen === ScreenName.PRODUCTS} onClick={() => setScreen(ScreenName.PRODUCTS)} />
                    
                    {/* Floating Cart Button */}
                    <div className="relative -top-8">
                        <button 
                            onClick={() => setScreen(ScreenName.CART)}
                            className="w-16 h-16 bg-vm-purple rounded-full flex items-center justify-center text-white shadow-[0_10px_30px_rgba(122,0,255,0.6)] border-[4px] border-[#0f0f11] active:scale-90 transition-transform"
                        >
                            <ShoppingBag size={24} />
                            {cart.length > 0 && (
                                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#0f0f11]">
                                    {cart.reduce((a,b) => a + b.quantity, 0)}
                                </span>
                            )}
                        </button>
                    </div>

                    <NavIcon icon={Ticket} label="Cupons" isActive={screen === ScreenName.COUPONS} onClick={() => setScreen(ScreenName.COUPONS)} />
                    <NavIcon icon={User} label="Perfil" isActive={screen === ScreenName.PROFILE} onClick={() => setScreen(ScreenName.PROFILE)} />
                </div>
            )}
        </div>
    );
}
