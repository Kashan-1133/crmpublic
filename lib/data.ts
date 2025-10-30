export type Campaign = {
  id: string;
  title: string;
  creatorId: string;
  brandId: string;
  status: 'Outreach' | 'Negotiation' | 'Content Pending' | 'Payment Pending' | 'Completed' | 'Archived';
  value: number;
  lastContactDate: string;
  communicationFrequency: 'Daily' | 'Weekly' | 'Bi-weekly';
  clientResponsiveness: 'very responsive' | 'somewhat responsive' | 'not very responsive';
  notes?: string;
  engagementLevel?: 'High' | 'Medium' | 'Low';
};

export type User = {
  id: string;
  name: string;
  avatarId: string;
  isCreator: boolean;
};

export type Payment = {
  id: string;
  campaignId: string;
  amount: number;
  status: 'Payment Pending' | 'Advance Received' | 'Payment Complete';
  date: string;
  comment?: string;
};

export type Message = {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
};

export type Conversation = {
  id: string;
  participantId: string;
  platform: 'TikTok' | 'Instagram' | 'Email' | 'WhatsApp';
  messages: Message[];
  lastMessage: Message;
};

export type Automation = {
    id: string;
    trigger: string;
    action: string;
    enabled: boolean;
};

export type Comment = {
  id: string;
  authorId: string;
  text: string;
  timestamp: string;
  likes: number;
  replies: Comment[];
};

export type Post = {
  id: string;
  creatorId: string;
  imageUrl: string;
  description: string;
  tags: string[];
  uploadDate: string;
  views: number;
  likes: number;
  comments: Comment[];
  shares: number;
};

export type Notification = {
    id: string;
    title: string;
    description: string;
    date: string;
    isRead: boolean;
    type: 'New Message' | 'Campaign Update' | 'Payment Processed' | 'Action Required';
};

export const users: User[] = [
  { id: 'user-1', name: 'Charli D\'Amelio', avatarId: 'avatar-1', isCreator: true },
  { id: 'user-2', name: 'Addison Rae', avatarId: 'avatar-2', isCreator: true },
  { id: 'user-3', name: 'Nike', avatarId: 'avatar-3', isCreator: false },
  { id: 'user-4', name: 'Gymshark', avatarId: 'avatar-4', isCreator: false },
  { id: 'user-5', name: 'Bella Poarch', avatarId: 'avatar-5', isCreator: true },
  { id: 'user-6', name: 'Prime Hydration', avatarId: 'avatar-6', isCreator: false },
];

export const campaigns: Campaign[] = [
  { id: 'camp-1', title: 'Fall Collection Launch', creatorId: 'user-1', brandId: 'user-3', status: 'Negotiation', value: 5000, lastContactDate: '2024-07-20', communicationFrequency: 'Daily', clientResponsiveness: 'very responsive', engagementLevel: 'High', notes: 'Finalizing contract details.' },
  { id: 'camp-2', title: 'Fitness Challenge', creatorId: 'user-2', brandId: 'user-4', status: 'Outreach', value: 7500, lastContactDate: '2024-07-15', communicationFrequency: 'Weekly', clientResponsiveness: 'somewhat responsive', engagementLevel: 'Medium' },
  { id: 'camp-3', title: 'New Song Promo', creatorId: 'user-5', brandId: 'user-6', status: 'Content Pending', value: 10000, lastContactDate: '2024-07-22', communicationFrequency: 'Daily', clientResponsiveness: 'very responsive', engagementLevel: 'High', notes: 'Creator is filming content this week.' },
  { id: 'camp-4', title: 'Summer Lookbook', creatorId: 'user-1', brandId: 'user-4', status: 'Payment Pending', value: 3000, lastContactDate: '2024-07-18', communicationFrequency: 'Weekly', clientResponsiveness: 'not very responsive', engagementLevel: 'Low' },
  { id: 'camp-5', title: 'Energy Drink Ad', creatorId: 'user-2', brandId: 'user-6', status: 'Completed', value: 12000, lastContactDate: '2024-06-30', communicationFrequency: 'Bi-weekly', clientResponsiveness: 'very responsive', engagementLevel: 'High' },
  { id: 'camp-6', title: 'Tech Gadget Review', creatorId: 'user-5', brandId: 'user-3', status: 'Archived', value: 4000, lastContactDate: '2024-05-10', communicationFrequency: 'Weekly', clientResponsiveness: 'somewhat responsive', engagementLevel: 'Medium' },
];

export const payments: Payment[] = [
    { id: 'pay-1', campaignId: 'camp-4', amount: 3000, status: 'Payment Pending', date: '2024-07-18' },
    { id: 'pay-2', campaignId: 'camp-5', amount: 6000, status: 'Payment Complete', date: '2024-07-05' },
    { id: 'pay-3', campaignId: 'camp-5', amount: 6000, status: 'Advance Received', date: '2024-06-15', comment: '50% advance' },
    { id: 'pay-4', campaignId: 'camp-1', amount: 2500, status: 'Advance Received', date: '2024-07-21', comment: '50% on signing' },
];

export const conversations: Conversation[] = [
    {
        id: 'conv-1',
        participantId: 'user-3',
        platform: 'Email',
        lastMessage: { id: 'msg-1-2', senderId: 'user-3', text: 'Sounds good, let\'s proceed.', timestamp: '2024-07-22T10:05:00Z', isRead: true },
        messages: [
            { id: 'msg-1-1', senderId: 'user-self', text: 'Here is the draft contract.', timestamp: '2024-07-22T09:30:00Z', isRead: true },
            { id: 'msg-1-2', senderId: 'user-3', text: 'Sounds good, let\'s proceed.', timestamp: '2024-07-22T10:05:00Z', isRead: true },
        ],
    },
    {
        id: 'conv-2',
        participantId: 'user-4',
        platform: 'TikTok',
        lastMessage: { id: 'msg-2-1', senderId: 'user-4', text: 'Hey! Love your content. Are you open for a collab?', timestamp: '2024-07-21T14:00:00Z', isRead: false },
        messages: [
            { id: 'msg-2-1', senderId: 'user-4', text: 'Hey! Love your content. Are you open for a collab?', timestamp: '2024-07-21T14:00:00Z', isRead: false },
        ],
    },
    {
        id: 'conv-3',
        participantId: 'user-6',
        platform: 'Instagram',
        lastMessage: { id: 'msg-3-2', senderId: 'user-self', text: 'Just sent over the first draft!', timestamp: '2024-07-22T11:00:00Z', isRead: true },
        messages: [
            { id: 'msg-3-1', senderId: 'user-6', text: 'Can\'t wait to see the video!', timestamp: '2024-07-22T10:45:00Z', isRead: true },
            { id: 'msg-3-2', senderId: 'user-self', text: 'Just sent over the first draft!', timestamp: '2024-07-22T11:00:00Z', isRead: true },
        ],
    }
];

export const automations: Automation[] = [
    { id: 'auto-1', trigger: 'Brand doesn\'t reply in 3 days during Outreach', action: 'Send automated follow-up email', enabled: true },
    { id: 'auto-2', trigger: 'Campaign is moved to "Completed"', action: 'Send thank-you email to brand and creator', enabled: true },
    { id: 'auto-3', trigger: 'Payment status is "Payment Complete"', action: 'Update dashboard total earnings', enabled: true },
    { id: 'auto-4', trigger: 'A new message is received from a high-value brand', action: 'Send a high-priority notification', enabled: false },
];

export const posts: Post[] = [
  { id: 'post-1', creatorId: 'user-1', imageUrl: 'https://picsum.photos/seed/post1/400/300', description: 'Loving the new fall collection from Nike! So comfy and stylish. #nike #fallfashion', tags: ['nike', 'fallfashion', 'ad'], uploadDate: '2024-07-25', views: 1256, likes: 342, comments: [], shares: 42 },
  { id: 'post-2', creatorId: 'user-2', imageUrl: 'https://picsum.photos/seed/post2/400/300', description: 'Kicking off the week with a @Gymshark workout. Who is with me? #gymshark #fitness #workout', tags: ['gymshark', 'fitness'], uploadDate: '2024-07-24', views: 2345, likes: 812, comments: [], shares: 56 },
  { id: 'post-3', creatorId: 'user-5', imageUrl: 'https://picsum.photos/seed/post3/400/300', description: 'So excited to share my new song, powered by @PrimeHydration. Go check it out!', tags: ['newmusic', 'prime'], uploadDate: '2024-07-23', views: 5890, likes: 1700, comments: [], shares: 120 },
  { id: 'post-4', creatorId: 'user-1', imageUrl: 'https://picsum.photos/seed/post4/400/300', description: 'Another look from the Gymshark summer campaign. These colors are everything!', tags: ['gymshark', 'summer', 'lookbook'], uploadDate: '2024-07-22', views: 1890, likes: 450, comments: [], shares: 31 },
];

export const notifications: Notification[] = [
    { id: 'notif-1', title: 'New Message from Gymshark', description: 'Hey! Love your content. Are you open for a collab?', date: '2024-07-28T10:00:00Z', isRead: false, type: 'New Message' },
    { id: 'notif-2', title: 'Campaign Status Updated', description: 'Your campaign "Fall Collection Launch" with Nike has moved to "Negotiation".', date: '2024-07-28T09:30:00Z', isRead: false, type: 'Campaign Update' },
    { id: 'notif-3', title: 'Payment Received', description: 'You received an advance payment of $2,500 for the "Fall Collection Launch" campaign.', date: '2024-07-27T15:45:00Z', isRead: true, type: 'Payment Processed' },
    { id: 'notif-4', title: 'Content Approval Required', description: 'Please review the content for the "New Song Promo" campaign.', date: '2024-07-26T11:00:00Z', isRead: true, type: 'Action Required' },
];
