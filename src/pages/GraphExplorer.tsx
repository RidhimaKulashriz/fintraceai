import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import ForceGraph2D, { ForceGraphMethods } from 'react-force-graph-2d';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ZoomIn, 
  ZoomOut, 
  RefreshCw, 
  Search, 
  Filter, 
  Info, 
  ShieldAlert, 
  ArrowRightLeft,
  User,
  Building2,
  MoreVertical,
  X,
  Activity,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { cn } from '../lib/utils';
import { generateGraphData, Node as GNode, Link as GLink } from '../lib/data-generator';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function GraphExplorer() {
  const fgRef = useRef<ForceGraphMethods>(null!);
  const [demoMode, setDemoMode] = useState(false);
  const [data, setData] = useState(generateGraphData(200, 300, false));
  const [selectedNode, setSelectedNode] = useState<GNode | null>(null);
  const [hoverNode, setHoverNode] = useState<GNode | null>(null);
  const [highlightNodes, setHighlightNodes] = useState<Set<any>>(new Set());
  const [highlightLinks, setHighlightLinks] = useState<Set<any>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth > 1024 ? window.innerWidth - 320 : window.innerWidth - 48;
      const height = window.innerHeight - 280;
      setDimensions({ width, height });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setData(generateGraphData(demoMode ? 100 : 200, demoMode ? 150 : 300, demoMode));
  }, [demoMode]);

  const updateHighlight = useCallback(() => {
    setHighlightNodes(new Set(highlightNodes));
    setHighlightLinks(new Set(highlightLinks));
  }, [highlightNodes, highlightLinks]);

  const handleNodeClick = useCallback((node: any) => {
    setSelectedNode(node);
    
    // Highlight connections
    const connectedNodes = new Set();
    const connectedLinks = new Set();
    
    data.links.forEach((link: any) => {
      if (link.source.id === node.id || link.target.id === node.id) {
        connectedLinks.add(link);
        connectedNodes.add(link.source);
        connectedNodes.add(link.target);
      }
    });
    
    setHighlightNodes(connectedNodes);
    setHighlightLinks(connectedLinks);
    
    // Center on node
    fgRef.current?.centerAt(node.x, node.y, 1000);
    fgRef.current?.zoom(2, 1000);
  }, [data]);

  const handleNodeHover = (node: any) => {
    setHoverNode(node || null);
  };

  const handleRefresh = () => {
    setData(generateGraphData(demoMode ? 100 : 200, demoMode ? 150 : 300, demoMode));
    setSelectedNode(null);
    setHighlightNodes(new Set());
    setHighlightLinks(new Set());
  };

  const filteredData = useMemo(() => {
    if (!searchQuery) return data;
    const lowerQuery = searchQuery.toLowerCase();
    const nodes = data.nodes.filter(n => n.name.toLowerCase().includes(lowerQuery) || n.id.toLowerCase().includes(lowerQuery));
    const nodeIds = new Set(nodes.map(n => n.id));
    const links = data.links.filter(l => {
      const sId = typeof l.source === 'string' ? l.source : (l.source as any).id;
      const tId = typeof l.target === 'string' ? l.target : (l.target as any).id;
      return nodeIds.has(sId) && nodeIds.has(tId);
    });
    return { nodes, links };
  }, [data, searchQuery]);

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="h-[calc(100vh-160px)] flex flex-col gap-6 relative"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">Fund Flow Explorer</h1>
          <p className="text-foreground/60">Interactive visualization of transaction networks.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={() => setDemoMode(!demoMode)}
            className={cn(
              "px-4 py-2 rounded-xl border transition-all flex items-center gap-2 text-sm font-bold",
              demoMode 
                ? "bg-fraud/10 border-fraud/50 text-fraud neon-glow shadow-fraud/20" 
                : "bg-card border-border text-foreground/60 hover:border-primary/50"
            )}
          >
            <Zap className={cn("w-4 h-4", demoMode && "animate-pulse")} />
            {demoMode ? "Demo: Fraud Scenarios" : "Normal Mode"}
          </button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <input 
              type="text" 
              placeholder="Search account..." 
              className="pl-10 pr-4 py-2 rounded-xl bg-card border border-border outline-none focus:border-primary/50 transition-all w-full md:w-48 lg:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            className="p-2 rounded-xl border border-border bg-card hover:bg-foreground/5 transition-all"
            aria-label="Refresh Graph Data"
          >
            <RefreshCw className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>

      {/* Main Graph Area */}
      <motion.div 
        variants={itemVariants}
        className="flex-1 rounded-2xl border border-border bg-card overflow-hidden relative shadow-2xl shadow-black/20"
      >
        <ForceGraph2D
          ref={fgRef as any}
          graphData={filteredData}
          nodeLabel={(node: any) => `${node.name} (${node.category} Risk)`}
          nodeCanvasObject={(node: any, ctx, globalScale) => {
            const label = node.name;
            const fontSize = 12 / globalScale;
            ctx.font = `${fontSize}px Inter`;
            const textWidth = ctx.measureText(label).width;
            const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2);

            // Node Circle
            ctx.beginPath();
            ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false);
            
            let color = '#00C389';
            if (highlightNodes.has(node)) color = '#21F3A4';
            else if (node.risk > 80) color = '#FF4D4F';
            else if (node.risk > 50) color = '#F59E0B';
            
            ctx.fillStyle = color;
            ctx.fill();

            // Glow for high risk
            if (node.risk > 80) {
              ctx.shadowBlur = 15;
              ctx.shadowColor = '#FF4D4F';
              ctx.strokeStyle = '#FF4D4F';
              ctx.lineWidth = 1;
              ctx.stroke();
              ctx.shadowBlur = 0;
            }

            // Label
            if (globalScale > 1.5) {
              ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
              ctx.fillText(label, node.x - textWidth / 2, node.y + 10);
            }
          }}
          linkWidth={(link: any) => highlightLinks.has(link) ? 4 : 1.5}
          linkColor={(link: any) => {
            if (highlightLinks.has(link)) return '#21F3A4';
            return link.suspicious ? '#FF4D4F' : 'rgba(255,255,255,0.1)';
          }}
          linkDirectionalParticles={2}
          linkDirectionalParticleWidth={(link: any) => link.suspicious ? 4 : 0}
          linkDirectionalParticleSpeed={0.01}
          onNodeClick={handleNodeClick}
          onNodeHover={handleNodeHover}
          backgroundColor="rgba(0,0,0,0)"
          width={dimensions.width}
          height={dimensions.height}
          cooldownTicks={100}
        />
        
        {/* Controls Overlay */}
        <div className="absolute bottom-6 left-6 flex flex-col gap-2">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => fgRef.current?.zoom(fgRef.current.zoom() * 1.2, 400)}
            className="p-2 rounded-lg bg-card/80 backdrop-blur-md border border-border hover:bg-foreground/5 transition-all"
          >
            <ZoomIn className="w-5 h-5" />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => fgRef.current?.zoom(fgRef.current.zoom() / 1.2, 400)}
            className="p-2 rounded-lg bg-card/80 backdrop-blur-md border border-border hover:bg-foreground/5 transition-all"
          >
            <ZoomOut className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Legend */}
        <div className="absolute top-6 left-6 p-4 rounded-xl bg-card/80 backdrop-blur-md border border-border space-y-2 hidden sm:block">
          <div className="flex items-center gap-2 text-xs font-bold text-foreground/60">
            <div className="w-3 h-3 rounded-full bg-primary" /> Low Risk
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-foreground/60">
            <div className="w-3 h-3 rounded-full bg-warning" /> Medium Risk
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-foreground/60">
            <div className="w-3 h-3 rounded-full bg-fraud animate-pulse" /> High Risk
          </div>
          <div className="h-px bg-border my-2" />
          <div className="flex items-center gap-2 text-xs font-bold text-foreground/60">
            <div className="w-6 h-0.5 bg-fraud border-t border-dashed border-fraud" /> Suspicious Flow
          </div>
        </div>

        {/* Node Detail Sidebar */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div 
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              className="absolute top-0 right-0 w-full sm:w-80 h-full bg-card/95 backdrop-blur-xl border-l border-border p-6 shadow-2xl overflow-y-auto z-50"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold">Investigation Details</h3>
                <button onClick={() => {
                  setSelectedNode(null);
                  setHighlightNodes(new Set());
                  setHighlightLinks(new Set());
                }} className="p-1 rounded-lg hover:bg-foreground/5">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-center mb-8">
                <div className={cn(
                  "w-20 h-20 rounded-2xl mx-auto flex items-center justify-center mb-4 relative",
                  selectedNode.risk > 80 ? "bg-fraud/20 text-fraud" : "bg-primary/20 text-primary"
                )}>
                  {selectedNode.type === 'merchant' ? <Building2 className="w-10 h-10" /> : <User className="w-10 h-10" />}
                  {selectedNode.risk > 80 && (
                    <div className="absolute -top-2 -right-2 p-1.5 rounded-lg bg-fraud text-white shadow-lg">
                      <ShieldAlert className="w-4 h-4" />
                    </div>
                  )}
                </div>
                <h4 className="text-lg font-bold">{selectedNode.name}</h4>
                <p className="text-sm text-foreground/50 uppercase tracking-widest font-bold">{selectedNode.type}</p>
              </div>

              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-foreground/5 border border-border">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-foreground/60">Anomaly Score</span>
                    <span className={cn(
                      "text-sm font-bold",
                      selectedNode.risk > 80 ? "text-fraud" : "text-primary"
                    )}>{selectedNode.risk}/100</span>
                  </div>
                  <div className="w-full h-2 bg-foreground/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedNode.risk}%` }}
                      className={cn(
                        "h-full transition-all duration-500",
                        selectedNode.risk > 80 ? "bg-fraud" : "bg-primary"
                      )} 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-foreground/5 border border-border">
                    <p className="text-[10px] text-foreground/40 uppercase font-bold mb-1">Velocity</p>
                    <p className="text-sm font-bold flex items-center gap-1">
                      <Zap className="w-3 h-3 text-warning" />
                      {selectedNode.velocity}%
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-foreground/5 border border-border">
                    <p className="text-[10px] text-foreground/40 uppercase font-bold mb-1">Risk Category</p>
                    <p className={cn(
                      "text-sm font-bold",
                      selectedNode.category === 'Critical' ? "text-fraud" : selectedNode.category === 'High' ? "text-warning" : "text-primary"
                    )}>{selectedNode.category}</p>
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-bold mb-4 flex items-center gap-2">
                    <ArrowRightLeft className="w-4 h-4 text-primary" />
                    Connected Entities
                  </h5>
                  <div className="space-y-3">
                    {Array.from(highlightNodes).filter(n => (n as any).id !== selectedNode.id).slice(0, 5).map((n: any, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-foreground/5 text-xs">
                        <div className="flex items-center gap-2">
                          <div className={cn("w-2 h-2 rounded-full", n.risk > 80 ? "bg-fraud" : "bg-primary")} />
                          <span className="text-foreground/60">{n.name}</span>
                        </div>
                        <span className="font-bold opacity-40">#{n.id.split('-')[1]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark transition-all neon-glow flex items-center justify-center gap-2"
                >
                  Deep Investigation <Info className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
