// API请求接口
const Const_Api_Root = "https://3wm.stec.sh.cn";

// 页面的关键字与描述
let keywords = ['隧道','上海','工程'];
let description = ['从国内首家基建板块上市公司，到21项世界工程建设史“第一记录”缔造者，再到全国布局，全球EPC市场公认的城市基础设施建设运营综合服务商，成立于1965年的隧道股份在50年的创业历程中，不断从世界各地吸引人才,持续扩大业务组合，核心产业覆盖至超大型隧道、轨道交通、路桥、地下空间、建筑与房地产、能源、水务、重型工程装备与绿色建材等9大领域。'];
function createMeta(){
    let metaK = document.createElement('meta');
    let metaD = document.createElement('meta');
    
    metaK.name = 'keywords';
    metaK.content = keywords.join('，');
    metaD.name = 'description';
    metaD.content = description.join('，');
    document.head.appendChild(metaK);
    document.head.appendChild(metaD);
}
createMeta()

export {Const_Api_Root}