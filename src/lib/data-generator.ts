export interface Node {
  id: string;
  name: string;
  type: 'account' | 'merchant' | 'bank';
  risk: number;
  balance: string;
  velocity: number;
  category: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface Link {
  source: string;
  target: string;
  amount: string;
  suspicious: boolean;
  timestamp: string;
}

export const generateGraphData = (nodeCount: number = 100, linkCount: number = 150, demoMode: boolean = false) => {
  const nodes: Node[] = [];
  const links: Link[] = [];

  const names = ['James Wilson', 'Sarah Chen', 'Robert Fox', 'Global Tech Ltd', 'Offshore Trust X', 'Crypto Exchange Z', 'Shell Corp A', 'Local Bank B', 'Elena Vance', 'Gordon Freeman', 'Alyx Vance', 'Barney Calhoun', 'Isaac Kleiner', 'Eli Vance', 'Wallace Breen', 'Judith Mossman'];
  const types: ('account' | 'merchant' | 'bank')[] = ['account', 'merchant', 'bank'];

  for (let i = 0; i < nodeCount; i++) {
    const risk = demoMode && i < 5 ? 90 + Math.floor(Math.random() * 10) : Math.floor(Math.random() * 100);
    let category: 'Low' | 'Medium' | 'High' | 'Critical' = 'Low';
    if (risk > 80) category = 'Critical';
    else if (risk > 60) category = 'High';
    else if (risk > 30) category = 'Medium';

    nodes.push({
      id: `node-${i}`,
      name: names[i % names.length] + (i >= names.length ? ` ${i}` : ''),
      type: types[i % types.length],
      risk,
      balance: `$${(Math.random() * 1000000).toFixed(2)}`,
      velocity: Math.floor(Math.random() * 100),
      category
    });
  }

  // Normal links
  for (let i = 0; i < linkCount; i++) {
    const source = nodes[Math.floor(Math.random() * nodeCount)].id;
    const target = nodes[Math.floor(Math.random() * nodeCount)].id;
    if (source === target) continue;

    const suspicious = Math.random() > 0.9;
    links.push({
      source,
      target,
      amount: `$${(Math.random() * 50000).toFixed(2)}`,
      suspicious,
      timestamp: new Date().toISOString()
    });
  }

  // Fraud Scenarios for Demo Mode
  if (demoMode) {
    // 1. Circular Transaction (node-0 -> node-1 -> node-2 -> node-0)
    links.push(
      { source: 'node-0', target: 'node-1', amount: '$50,000.00', suspicious: true, timestamp: new Date().toISOString() },
      { source: 'node-1', target: 'node-2', amount: '$49,500.00', suspicious: true, timestamp: new Date().toISOString() },
      { source: 'node-2', target: 'node-0', amount: '$49,000.00', suspicious: true, timestamp: new Date().toISOString() }
    );

    // 2. Mule Account (node-3 receives from many, sends to node-4)
    for (let i = 10; i < 15; i++) {
      links.push({
        source: `node-${i}`,
        target: 'node-3',
        amount: `$${(Math.random() * 5000).toFixed(2)}`,
        suspicious: true,
        timestamp: new Date().toISOString()
      });
    }
    links.push({
      source: 'node-3',
      target: 'node-4',
      amount: '$25,000.00',
      suspicious: true,
      timestamp: new Date().toISOString()
    });
  }

  return { nodes, links };
};

export const generateHeatmapData = (xLabels: string[], yLabels: string[]) => {
  return new Array(yLabels.length)
    .fill(0)
    .map(() => new Array(xLabels.length).fill(0).map(() => Math.floor(Math.random() * 100)));
};
