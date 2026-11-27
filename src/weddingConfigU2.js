import { venue, venueHi } from './weddingConfig'

// Bride's-side links (/u2, or ?u=u2).
// Each key written here REPLACES the same key from weddingConfig.js as a whole
// (wedding → weddingU2 for English, weddingHi → weddingHiU2 for Hindi).
// Any key not written here is taken from weddingConfig.js — e.g. add venue, musicUrl,
// familyInvites, gallery … here only if the bride's side should see something different.
// Page text (titles, labels) for /u2 goes in src/lib/stringsU2.js.
//
// /u3 links use everything here too, except: events marked `hideOnU3: true` are left out
// and the venue section is hidden.

export const weddingU2 = {
  // the full event list for /u2 (replaces the main list completely)
  events: [
    {
      name: 'Lagan-Lekhan',
      date: '07th December 2026',
      time: '10:15 AM',
      venue: "At Our Residence",
      // description: 'An elegant ceremony marking the beautiful beginning of our formal commitment to a lifetime together.',
    },
    {
      name: 'Chaak poojan',
      date: '08th December 2026',
      time: '09:15 AM',
      venue: "At Our Residence",
      // description: 'An elegant ceremony marking the beautiful beginning of our formal commitment to a lifetime together.',
    },
    {
      name: 'Chhathi parojan Chi. Krishna',
      date: '08th December 2026',
      time: 'Lunch 12:15 PM',
      venue: "Avdhut Ashram, Station Road, Rajgarh",
      // description: 'An elegant ceremony marking the beautiful beginning of our formal commitment to a lifetime together.',
    },
    {
      name: 'Bhaat',
      date: '08th December 2026',
      time: '2:15 PM',
      venue: "Avdhut Ashram, Station Road, Rajgarh",
      // description: 'An elegant ceremony marking the beautiful beginning of our formal commitment to a lifetime together.',
    },
    {
      name: 'Engagement',
      hideOnU3: true,
      date: '11th December 2026',
      time: '7:30 AM',
      venue: venue,
      description: 'An elegant ceremony marking the beautiful beginning of our formal commitment to a lifetime together.',
    },
    {
      name: 'Haldi Carnival',
      hideOnU3: true,
      date: '11th December 2026',
      time: '10:30 AM',
      venue: venue,
      description: 'A vibrant morning filled with cheerful music, colorful drapes.',
      attire: 'Sky Blue & Pestal Glam',
      'badge_color': '#79c4f0ff'
    },
    {
      name: 'Welcome Baraat',
      hideOnU3: true,
      date: '11th December 2026',
      time: '7:00 PM',
      venue: venue,
      description: "A warm welcome to everyone! The groom’s squad has arrived. Let's give them a grand welcome!",
    },
    {
      name: 'Dinner',
      hideOnU3: true,
      date: '11th December 2026',
      time: '7:30 PM',
      venue: venue,
      description: 'Kindly join us for an evening of dining and celebration.',
    },
    {
      name: 'Wedding Ceremony',
      hideOnU3: true,
      date: '',
      time: '3:00 AM',
      venue: venue,
      description: 'The sacred pheras and rituals uniting Rashmi & Ritik for life.',
    },
  ],
  familyInvites: {
    fa2: [
      {
        title: 'Special Requests',
        names: ['Mrs. Manju Mittal', 'Meera - Bhagwan Sahay Ji', 'Sunita - Mahesh Ji', 'Mamta - Sanjay Ji', 'Priyanka - Punit Ji', 'Shikha - Aashish Ji'],
      },
      {
        title: 'Eager to Welcome',
        names: ['Mrs. Chandrakala Goyal', 'Kedar - Vandana', 'Yashwant - Manisha', 'Devashish - Deepika', 'Rituraj - Preeti'],
      },
      {
        title: 'Uttrakanshi',
        names: ['Dr. Ghanshyam Goyal', 'Krishna Goyal'],
      },
      {
        title: 'Seekers of a Glimpse',
        names: ['Harsh, Chandan', 'Kanak, Prateek', 'Lovik, Krishiv', 'All Goyal Family'],
      }
    ]
  }
}

export const weddingHiU2 = {
  // the full event list for /u2 (replaces the main list completely)
  events: [
    {
      name: 'लग्न लेखन',
      date: '7 दिसंबर 2026',
      time: 'प्रातः 10:15',
      venue: 'निज निवास पर',
    },
    {
      name: 'चाक पूजन',
      date: '8 दिसंबर 2026',
      time: 'प्रातः 9:15',
      venue: 'निज निवास पर',
    },
    {
      name: 'छठी परोजन चि. कृष्णा',
      date: '8 दिसंबर 2026',
      time: 'लंच अपराह्न 12:15',
      venue: 'अवधूत आश्रम, स्टेशन रोड, राजगढ़',
    },
    {
      name: 'भात',
      date: '8 दिसंबर 2026',
      time: 'अपराह्न 2:15',
      venue: 'अवधूत आश्रम, स्टेशन रोड, राजगढ़',
    },
    {
      name: 'सगाई',
      hideOnU3: true,
      date: '11 दिसंबर 2026',
      time: 'प्रातः 7:30',
      venue: venueHi,
      description: 'वर-वधू के शुभ मिलन का पहला वचन, परिवारजनों के आशीर्वाद के साथ।',
    },
    {
      name: 'फूलों की हल्दी',
      hideOnU3: true,
      date: '11 दिसंबर 2026',
      time: 'प्रातः 10:30',
      venue: venueHi,
      description: 'परिवार और मित्रों के साथ नृत्य, संगीत और प्रस्तुतियों की एक यादगार समारोह।',
      attire: 'स्काई ब्लू और पेस्टल ग्लैम',
      'badge_color': '#79c4f0ff'
    },
    {
      name: 'बारात स्वागत',
      hideOnU3: true,
      date: '11 दिसंबर 2026',
      time: 'सायं 7:00',
      venue: venueHi,
      description: 'आप सभी का हार्दिक स्वागत है! दूल्हे राजा की टोली आ पहुँची है — आइए, मिलकर उनका भव्य स्वागत करें!',
    },
    {
      name: 'रात्रिभोज',
      hideOnU3: true,
      date: '11 दिसंबर 2026',
      time: 'सायं 7:30',
      venue: venueHi,
      description: 'स्नेहभोज और उत्सव की इस मधुर संध्या में आप सादर आमंत्रित हैं।',
    },
    {
      name: 'विवाह संस्कार',
      hideOnU3: true,
      date: '',
      time: 'रात्रि 03:00',
      venue: venueHi,
      description: 'पवित्र फेरे और रीति-रिवाज, जो रश्मि और रितिक को जीवन भर के लिए एक करते हैं।',
    },
  ],
  familyInvites: {
    fa2: [
      {
        title: 'विशेष आग्रह',
        names: ['श्रीमती मंजू मित्तल', 'मीरा - भगवान सहाय जी', 'सुनीता - महेश जी', 'ममता - संजय जी', 'प्रियंका - पुनीत जी', 'शिखा - आशीष जी'],
      },
      {
        title: 'स्वागतोत्सुक',
        names: ['श्रीमती चंद्रकला गोयल', 'केदार - वंदना', 'यशवंत - मनीषा', 'देवाशीष - दीपिका', 'ऋतुराज - प्रीति'],
      },
      {
        title: 'उत्तराकांक्षी',
        names: ['डॉ. घनश्याम गोयल', 'कृष्णा गोयल'],
      },
      {
        title: 'दर्शनाभिलाषी',
        names: ['हर्ष, चंदन', 'कनक, प्रतीक', 'लविक, कृशिव', 'समस्त गोयल परिवार'],
      },
    ]
  }
}
