import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Calendar, Clock, ArrowLeft, Tag, User, Ghost, Moon, Play, Flame, Wind } from "lucide-react";
import { motion } from "motion/react";
import { blogPosts, BlogPost as BlogPostType } from "../data/blog";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CodeBlock } from "./CodeBlock";
import { ComparisonTable, ComparisonColumn, ComparisonFeature } from "./ComparisonTable";
import { useEffect } from "react";

interface BlogPostProps {
  postId: string;
  onBackClick: () => void;
}

export function BlogPost({ postId, onBackClick }: BlogPostProps) {
  const post = blogPosts.find(p => p.id === postId);

  useEffect(() => {
    // Scroll to top when post changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [postId]);

  if (!post) {
    return (
      <section className="py-20 min-h-screen">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center">
            <h1 className="mb-6">Post Not Found</h1>
            <Button onClick={onBackClick} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Button>
          </div>
        </div>
      </section>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Comparison table data
  const getComparisonTableData = (type: string) => {
    if (type === 'streaming') {
      const columns: ComparisonColumn[] = [
        {
          name: 'Ghost Watcher',
          icon: <Ghost className="w-5 h-5" />,
          isHighlighted: true,
          price: { currency: 'EUR', amount: 20, period: 'mo' },
          cta: { text: 'Get now', onClick: () => console.log('Get Ghost Watcher') }
        },
        {
          name: 'Luna plus',
          icon: <Moon className="w-5 h-5 text-gray-400" />,
          price: { currency: 'EUR', amount: 50, period: 'mo' }
        },
        {
          name: 'PointTV',
          icon: <Play className="w-5 h-5 text-gray-400" />,
          price: { currency: 'EUR', amount: 25, period: 'mo' }
        },
        {
          name: 'The Heat',
          icon: <Flame className="w-5 h-5 text-gray-400" />,
          price: { currency: 'EUR', amount: 30, period: 'mo' }
        },
        {
          name: 'Squeezy',
          icon: <Wind className="w-5 h-5 text-gray-400" />,
          price: { currency: 'EUR', amount: 32, period: 'mo' }
        }
      ];

      const features: ComparisonFeature[] = [
        { name: 'Unlimited devices', values: [true, false, false, false, false] },
        { name: '4k streaming', values: [true, false, true, false, true] },
        { name: 'No ads', values: [true, true, true, false, true] },
        { name: 'Offline access', values: [true, true, false, true, false] },
        { name: 'Multiple profiles', values: [true, true, false, true, false] },
        { name: '24/7 support', values: [true, true, true, false, true] }
      ];

      return { columns, features };
    }
    return null;
  };

  // Convert markdown-style content to HTML-like structure for display
  const renderContent = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: JSX.Element[] = [];
    let currentParagraph: string[] = [];
    let inCodeBlock = false;
    let codeBlockLines: string[] = [];
    let codeLanguage = '';
    let inTable = false;
    let tableLines: string[] = [];
    let key = 0;

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        const text = currentParagraph.join(' ').trim();
        if (text) {
          // Process inline code (backticks)
          const parts = text.split(/(`[^`]+`)/g);
          const processedText = parts.map((part, idx) => {
            if (part.startsWith('`') && part.endsWith('`')) {
              return (
                <code key={idx} className="code-inline">
                  {part.slice(1, -1)}
                </code>
              );
            }
            return part;
          });
          elements.push(<p key={`p-${key++}`} className="mb-4">{processedText}</p>);
        }
        currentParagraph = [];
      }
    };

    const flushTable = () => {
      if (tableLines.length > 0) {
        // Parse table: first line is header, second is separator, rest are rows
        const headers = tableLines[0].split('|').map(h => h.trim()).filter(h => h);
        const rows = tableLines.slice(2).map(row => 
          row.split('|').map(cell => cell.trim()).filter(cell => cell !== '')
        ).filter(row => row.length > 0);
        
        // Use legacy table format for markdown tables
        elements.push(
          <div key={`table-${key++}`} className="comparison-table-wrapper">
            <div className="overflow-x-auto">
              <table className="comparison-table">
                <thead>
                  <tr>
                    {headers.map((header, index) => (
                      <th key={index}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
        tableLines = [];
        inTable = false;
      }
    };

    lines.forEach((line, index) => {
      // Special comparison table syntax: [comparison_table:type]
      if (line.trim().match(/^\[comparison_table:(\w+)\]$/)) {
        flushParagraph();
        flushTable();
        const tableType = line.trim().match(/^\[comparison_table:(\w+)\]$/)?.[1];
        if (tableType) {
          const tableData = getComparisonTableData(tableType);
          if (tableData) {
            elements.push(
              <ComparisonTable
                key={`comparison-${key++}`}
                title="How we compare"
                columns={tableData.columns}
                features={tableData.features}
              />
            );
          }
        }
        return;
      }

      // Code blocks
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          flushParagraph();
          flushTable();
          elements.push(
            <CodeBlock 
              key={`code-${key++}`}
              code={codeBlockLines.join('\n')}
              language={codeLanguage || 'typescript'}
            />
          );
          codeBlockLines = [];
          codeLanguage = '';
          inCodeBlock = false;
        } else {
          flushParagraph();
          flushTable();
          inCodeBlock = true;
          codeLanguage = line.substring(3).trim();
        }
        return;
      }

      if (inCodeBlock) {
        codeBlockLines.push(line);
        return;
      }

      // Table detection (markdown tables start with |)
      if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
        flushParagraph();
        inTable = true;
        tableLines.push(line);
        return;
      } else if (inTable && line.trim() === '') {
        flushTable();
        return;
      } else if (inTable) {
        flushTable();
      }

      // Headings
      if (line.startsWith('# ')) {
        flushParagraph();
        elements.push(<h1 key={`h1-${key++}`} className="mb-6 mt-8 first:mt-0">{line.substring(2)}</h1>);
      } else if (line.startsWith('## ')) {
        flushParagraph();
        elements.push(<h2 key={`h2-${key++}`} className="mb-4 mt-8">{line.substring(3)}</h2>);
      } else if (line.startsWith('### ')) {
        flushParagraph();
        elements.push(<h3 key={`h3-${key++}`} className="mb-3 mt-6">{line.substring(4)}</h3>);
      } 
      // Lists
      else if (line.match(/^\d+\.\s/)) {
        flushParagraph();
        const text = line.replace(/^\d+\.\s/, '');
        elements.push(
          <li key={`li-${key++}`} className="ml-6 mb-2 list-decimal">
            {text}
          </li>
        );
      } else if (line.startsWith('- ')) {
        flushParagraph();
        elements.push(
          <li key={`li-${key++}`} className="ml-6 mb-2 list-disc">
            {line.substring(2)}
          </li>
        );
      }
      // Empty lines
      else if (line.trim() === '') {
        flushParagraph();
      }
      // Regular text
      else {
        currentParagraph.push(line);
      }
    });

    flushParagraph();
    flushTable();
    return elements;
  };

  return (
    <motion.section 
      className="py-20 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button 
            variant="ghost" 
            onClick={onBackClick}
            className="mb-8 gap-2 -ml-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Button>

          <div className="mb-8">
            <Badge variant="outline" className="mb-4">
              {post.category}
            </Badge>
            <h1 className="mb-6">{post.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="gap-1">
                  <Tag className="w-3 h-3" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <motion.div 
            className="relative h-[400px] mb-12 rounded-xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ImageWithFallback
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </motion.div>

          <motion.article 
            className="prose prose-neutral dark:prose-invert max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="text-foreground space-y-4">
              {renderContent(post.content)}
            </div>
          </motion.article>

          <motion.div 
            className="mt-12 pt-8 border-t border-border"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button onClick={onBackClick} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to All Posts
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
