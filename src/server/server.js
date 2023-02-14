import express from "express";
import cors from "cors";

const PROJECTS = [
  {
    company: "Geomiq",
    companyUrl: "https://geomiq.com/",
    round: "Seed",
    sector: "B2B Marketplaces",
    description:
      "B2B manufacturing marketplace for low volume parties. Platform makes 3-rd party low-volume manufacturing process seamless and transparent, shortens quoting process to as low as 24hrs and overall go-to-market to 5-7 days instead of 4-6 weeks with use of traditional processes.",

    location: "UK",
    bio: {
      label: "Why we invested",
      list: [
        {
          url: "https://medium.com/sova-vc/changing-low-volume-manufacturing-game-our-investment-in-geomiq-20823c975084",
          linkType: "medium",
        },
      ],
    },
    logoUrl: "",
    tabs: [
      { id: "ckyim83n7003x0ztgawqd3n7h", title: "All funds", queryId: "all" },
      {
        id: "ckyim8n9d003z0ztg943he27p",
        title: "Marketplace Fund",
        queryId: "marketplace-fund",
      },
    ],
  },
  {
    company: "Feel",
    companyUrl: "https://wearefeel.com/",
    round: "Series A",
    sector: "B2C Services",
    description:
      "Provider of supplements and multivitamins via monthly subscription. Develops own high-quality multivitamin sets & formulas, which consist of best ingredients, have affordable pricing and backed by science.",

    location: "UK",
    bio: {
      label: "Why we invested",
      list: [
        {
          url: "https://medium.com/sova-vc/the-best-way-to-stay-healthy-our-investment-in-feel-a9fa246fead4",
          linkType: "medium",
        },
      ],
    },
    logoUrl: "",
    tabs: [
      { id: "ckyim83n7003x0ztgawqd3n7h", title: "All funds", queryId: "all" },
      {
        id: "ckyim8n9d003z0ztg943he27p",
        title: "Marketplace Fund",
        queryId: "marketplace-fund",
      },
    ],
  },
  {
    company: "Smartcat",
    companyUrl: "https://www.smartcat.com",
    round: "Series B",
    sector: "B2B Marketplaces",
    description:
      "A global B2B translation services marketplace that connects translation agencies, freelancers and enterprise clients to enable continuous delivery of multilingual content. Smartcat is an all-in-one platform connecting businesses and translators into a continuous translation delivery loop. By combining a collaborative workflow solution, a marketplace, and a network of translation professionals, Smartcat drives the language industry to its full technological potential, making both customers and vendors happy in the process.",

    location: "USA",
    bio: {
      label: "Why we invested",
      list: [
        {
          url: "https://medium.com/sova-vc/the-best-way-to-stay-healthy-our-investment-in-feel-a9fa246fead4",
          linkType: "medium",
        },
      ],
    },
    logoUrl: "",
    tabs: [
      { id: "ckyim83n7003x0ztgawqd3n7h", title: "All funds", queryId: "all" },
      {
        id: "ckyim8n9d003z0ztg943he27p",
        title: "Marketplace Fund",
        queryId: "marketplace-fund",
      },
    ],
  },
  {
    company: "Laundryheap",
    companyUrl: "https://www.laundryheap.co.uk/",
    round: "Series A",
    sector: "B2B / B2C Managed Marketplace",
    description:
      "The world's largest on-demand laundry and dry-cleaning service. Laundryheap’s platform allows users to have their laundry collected, washed, ironed and returned to them in a guaranteed turnaround time of 24 hours.",
    location: "UK",
    bio: {
      label: "Why we invested",
      list: [
        {
          url: "https://medium.com/sova-vc/our-investment-in-laundryheap-disrupting-the-laundry-and-dry-cleaning-industry-30436e488bc7",
          linkType: "medium",
        },
      ],
    },
    logoUrl: "",
    tabs: [
      { id: "ckyim83n7003x0ztgawqd3n7h", title: "All funds", queryId: "all" },
      {
        id: "ckyim8e29003y0ztg5bbs8i36",
        title: "Liquidity Fund",
        queryId: "liquidity-fund",
      },
    ],
  },
  {
    company: "CG Hero",
    companyUrl: "https://cghero.com",
    round: "Series A",
    sector: "B2B Marketplaces",
    description:
      "Collaborative B2B marketplace for CGI (computer generated imagery production) that helps to deliver 2D, 3D, Animation and VFX from thousands of industry professionals. CG Hero is one-stop-shop procurement platform that helps clients to find best suppliers as well as build and manage project teams throughout the whole process of CG assets creation.",

    location: "UK",
    bio: {
      label: "Why we invested",
      list: [
        {
          url: "https://medium.com/sova-vc/lights-camera-action-why-we-invested-in-cg-hero-32dd31642e2e",
          linkType: "medium",
        },
      ],
    },
    logoUrl: "",
    tabs: [
      { id: "ckyim83n7003x0ztgawqd3n7h", title: "All funds", queryId: "all" },
      {
        id: "ckyim8n9d003z0ztg943he27p",
        title: "Marketplace Fund",
        queryId: "marketplace-fund",
      },
    ],
  },
  {
    company: "Yardlink",
    companyUrl: "https://yardlink.com",
    round: "Series A",
    sector: "B2B Marketplaces",
    description:
      "Industry-leading B2B marketplace for construction equipment rent. Platform for connected construction, that includes procurement workflows and team dashboards to manage orders 24/7 as well as enables order confirmation within 20 minutes and next day delivery.",
    location: "UK",
    bio: {
      label: "Why we invested",
      list: [
        {
          url: "https://medium.com/sova-vc/reconstructing-construction-our-investment-in-yardlink-a55d0d6741d7",
          linkType: "medium",
        },
      ],
    },
    logoUrl: "",
    tabs: [
      { id: "ckyim83n7003x0ztgawqd3n7h", title: "All funds", queryId: "all" },
      {
        id: "ckyim8n9d003z0ztg943he27p",
        title: "Marketplace Fund",
        queryId: "marketplace-fund",
      },
    ],
  },
];

const TABS = [
  {
    id: "ckyim83n7003x0ztgawqd3n7h",
    title: "All funds",
    queryId: "all",
  },
  {
    id: "ckyim8e29003y0ztg5bbs8i36",
    title: "Liquidity Fund",
    queryId: "liquidity-fund",
  },
  {
    id: "ckyim8n9d003z0ztg943he27p",
    title: "Marketplace Fund",
    queryId: "marketplace-fund",
  },
];

const PAGE = {
  name: "Table",
  components: [
    {
      title: "My portfolio companies",
      columnLabels: {
        0: "Company",
        1: "Round",
        2: "Geography",
        3: "Sector",
        4: "Bio",
      },
    },
  ],
};

const fakeResponse = [
  {
    page: PAGE,
    tabs: TABS,
    projects: PROJECTS,
  },
];

const app = express();
const port = 8000;

// app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   res.send(`Hi! Server is listening on port ${port}`);
// });

app.get("/", (req, res) => {
  res.send(fakeResponse);
});

// listen on the port
app.listen(port);
