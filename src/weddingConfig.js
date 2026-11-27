import { IMAGES } from './lib/images'
import { MUSIC } from './lib/music'

export const venue = 'Valley View Garden Vatika'
export const venueHi = 'वैली व्यू गार्डन वाटिका'
export const hotel = "Tripli Hotel, Sector 13"
export const hotelHi = "ट्रिपली होटल, सेक्टर 13"
// Edit this file to personalize the invitation with your real details.
export const wedding = {
  // "Our Story" section + its menu link. false = hidden everywhere (content below is kept);
  // set back to true to show it again. Family links (?fa=…) always hide it.
  showStory: false,
  // Background music, started when the guest taps the envelope. Leave '' for no music.
  // Either drop an mp3 into public/music/ and use '/music/song.mp3', or paste a direct
  // link to an audio file (must end in .mp3/.m4a etc. — YouTube/Spotify page links won't play).
  musicUrl: MUSIC.music,
  brideFirst: 'Rashmi',
  groomFirst: 'Ritik',
  brideFull: 'Rashmi Goyal',
  groomFull: 'Ritik Parikh',
  hashtag: '#Mithik',
  // ISO date string used for the countdown + hero date
  weddingDateISO: '2026-12-11T10:00:00',
  weddingDateDisplay: '11th December 2026',
  street: 'Sector 13',
  city: 'Udaipur, Rajasthan',
  venue: venue,
  address: 'Udaipur, Rajasthan',
  mapsUrl: 'https://maps.app.goo.gl/vskicYuL9vjrwTkK6',
  events: [
    {
      name: 'Engagement',
      date: '11th December 2026',
      time: '7:30 AM',
      venue: venue,
      description: 'An elegant ceremony marking the beautiful beginning of our formal commitment to a lifetime together.',
    },
    {
      name: 'Ganpati Sthapana',
      date: '11th December 2026',
      time: '9:00 AM',
      venue: venue,
      description: 'Invoking the divine presence and blessings of Lord Ganesha for an auspicious beginning.',
    },
    {
      name: 'Mangal Kalash',
      date: '11th December 2026',
      time: '10:00 AM',
      venue: venue,
      description: 'A sacred ritual of establishing the holy Kalash to bring prosperity and bliss to married life.',
    },
    {
      name: 'Haldi Carnival',
      date: '11th December 2026',
      time: '10:30 AM',
      venue: venue,
      description: 'A vibrant morning filled with cheerful music, colorful drapes.',
    },
    {
      name: 'Grah Shanti',
      date: '11th December 2026',
      time: '1:30 PM',
      venue: venue,
      description: 'You are cordially invited to the holy Grah Shanti Yajna, organized to seek cosmic blessings, peace, and prosperity for the couple.',
    },
    {
      name: 'Barat',
      date: '11th December 2026',
      time: '5:00 PM',
      venue: hotel,
      description: 'A warm welcome to join the joyous moments of the groom\'s traditional sehra-bandi and royal wedding procession.',
    },
    {
      name: 'Reception',
      date: '11th December 2026',
      time: '7:30 PM',
      venue: venue,
      description: 'Dinner and celebration as husband and wife for the very first time.',
    },
    {
      name: 'Wedding Ceremony',
      date: '',
      time: '3:00 AM',
      venue: venue,
      description: 'The sacred pheras and rituals uniting Rashmi & Ritik for life.',
    },
  ],
  story: [
    {
      year: '2021',
      title: 'First Meeting',
      text: 'Rashmi and Ritik met at a office new building inauguration after covid',
    },
    {
      year: '2021',
      title: 'Growing Closer',
      text: 'What started as long phone calls turned into daily walks, festivals together.',
    },
    {
      year: '2024',
      title: 'Pre-wedding engagement',
      text: 'Two families said yes, and two hearts became one. Our beautiful journey officially started with a traditional blessing.',
    },
    {
      year: '2026',
      title: 'The Wedding',
      text: 'Surrounded by family, friends, and generations of tradition, Rashmi & Ritik tie the knot.',
    },
  ],
  gallery: [
    IMAGES.image1,
    IMAGES.image2,
    IMAGES.image3,
    IMAGES.image4,
    IMAGES.image5,
    IMAGES.image6,
    IMAGES.image7,
    IMAGES.image8,
  ],
  // Family invitation lists — shown only when the link carries ?fa=<key>,
  // e.g. /?fa=fa1 or /u2?fa=fa1&language=hn. Add fa2, fa3 … the same way.
  familyInvites: {
    fa1: [
      {
        title: 'Special Requests',
        names: ['Kusum - Rajnish', 'Jagrati - Narendra', 'Anita - Late Shaymsunder', 'Himani - Vivak', 'Niyati, Nishi'],
      },
      {
        title: 'Eager to Welcome',
        names: ['Nirmala - Krishn Das Ji', 'Upasna - Brijesh Ji', 'Sadhan - Pankaj Ji', 'Mardul, Palash', 'Somya, Daksh'],
      },
      {
        title: 'Seekers of a Glimpse',
        names: ['Mrs. Chandrakanta', 'Pushpa - Chandrakishor', 'All Maya Family'],
      },
      {
        title: 'Baal Aagrah',
        names: ['Anupriya'],
      },
    ]
  },
  contact: {
    phone: '+91 ----- -----',
    email: 'rashmi.ritik.wedding@example.com',
  },
}

// Devanagari version of everything guests actually read. Anything omitted here
// falls back to the English value above, so partial translations are fine.
export const weddingHi = {
  ...wedding,
  brideFirst: 'रश्मि',
  groomFirst: 'रितिक',
  brideFull: 'रश्मि गोयल',
  groomFull: 'रितिक पारीख',
  weddingDateDisplay: '11 दिसंबर 2026',
  city: 'उदयपुर, राजस्थान',
  street: 'सेक्टर-13',
  venue: venueHi,
  address: 'उदयपुर, राजस्थान',
  events: [
    {
      name: 'सगाई',
      date: '11 दिसंबर 2026',
      time: 'प्रातः 7:30',
      venue: venueHi,
      description: 'वर-वधू के शुभ मिलन का पहला वचन, परिवारजनों के आशीर्वाद के साथ।',
    },
    {
      name: 'गणपति स्थापना',
      date: '11 दिसंबर 2026',
      time: 'प्रातः 9:00',
      venue: venueHi,
      description: 'प्रथम पूज्य भगवान श्री गणेश के आह्वान और मंगलकारी स्थापना।',
    },
    {
      name: 'मंगल कलश',
      date: '11 दिसंबर 2026',
      time: 'प्रातः 10:00',
      venue: venueHi,
      description: 'वैवाहिक जीवन की मंगलकामना हेतु पवित्र कलश स्थापना।',
    },
    {
      name: 'फूलों की हल्दी',
      date: '11 दिसंबर 2026',
      time: 'प्रातः 10:30',
      venue: venueHi,
      description: 'परिवार और मित्रों के साथ नृत्य, संगीत और प्रस्तुतियों की एक यादगार समारोह।',
    },
    {
      name: 'ग्रह शांति',
      date: '11 दिसंबर 2026',
      time: 'अपराह्न 1:30',
      venue: venueHi,
      description: 'नवग्रहों की कृपा, सुख-समृद्धि और वैवाहिक जीवन की मंगलकामना हेतु आयोजित ग्रह शांति यज्ञ में आपका सादर आमंत्रण।',
    },
    {
      name: 'वर निकासी',
      date: '11 दिसंबर 2026',
      time: 'सायं 5:00',
      venue: hotelHi,
      description: 'दूल्हे राजा की सेहराबंदी और मंगलमय विवाह यात्रा (निकासी) के आनंदमय क्षणों में आपका हार्दिक स्वागत है।',
    },
    {
      name: 'प्रीतिभोज',
      date: '11 दिसंबर 2026',
      time: 'सायं 7:30',
      venue: venueHi,
      description: 'पति-पत्नी के रूप में पहली बार, स्नेहभोज और उत्सव के साथ।',
    },
    {
      name: 'विवाह संस्कार',
      date: '',
      time: 'रात्रि 03:00',
      venue: venueHi,
      description: 'पवित्र फेरे और रीति-रिवाज, जो रश्मि और रितिक को जीवन भर के लिए एक करते हैं।',
    },
  ],
  story: [
    {
      year: '2021',
      title: 'पहली मुलाकात',
      text: 'कोविड के बाद कार्यालय के नए भवन के उद्घाटन समारोह में रश्मि और रितिक की पहली मुलाकात हुई।',
    },
    {
      year: '2021',
      title: 'बढ़ती नज़दीकियाँ',
      text: 'लंबी फ़ोन बातों का सिलसिला रोज़ की सैर और साथ मनाए त्योहारों में बदल गया।',
    },
    {
      year: '2024',
      title: 'विवाह पूर्व सगाई',
      text: 'दोनों परिवारों की सहमति मिली और दो दिल एक हो गए। पारंपरिक आशीर्वाद के साथ हमारी इस सुंदर यात्रा का विधिवत आरंभ हुआ।',
    },
    {
      year: '2026',
      title: 'विवाह',
      text: 'परिवार, मित्रों और पीढ़ियों से चली आ रही परंपराओं के सान्निध्य में रश्मि और रितिक विवाह के बंधन में बँध रहे हैं।',
    },
  ],
  familyInvites: {
    fa1: [
      {
        title: 'विशेष आग्रह',
        names: ['कुसुम - रजनीश', 'जागृति - नरेंद्र', 'अनीता - स्व. श्यामसुंदर', 'हिमानी - विवेक', 'नियति, निशि'],
      },
      {
        title: 'स्वागतोत्सुक',
        names: ['निर्मला - कृष्णदास जी', 'उपासना - बृजेश जी', 'साधना - पंकज जी', 'मृदुल, पलाश', 'सौम्य, दक्ष'],
      },
      {
        title: 'दर्शनाभिलाषी',
        names: ['श्रीमती चंद्रकांता', 'पुष्पा - चंद्रकिशोर', 'समस्त माया परिवार'],
      },
      {
        title: 'बाल आग्रह',
        names: ['अनुप्रिया'],
      },
    ]
  },
}

export const getWedding = (lang) => (lang === 'hi' ? weddingHi : wedding)
